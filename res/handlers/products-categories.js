const ProductsCategories = require('mongoose').model('ProductsCategories');
const express = require('express');

const router = new express.Router();

const addCategoryFormValidation = require(
    '../middleware/add-category-form-validation.js');

const authValidation = require(
    '../middleware/auth-validation.js',
);

router.post('/add-category', addCategoryFormValidation, authValidation,
    (req, res) => {
      if (!req.body.success)
        return res.status(400).json({
          message: req.body.message,
          errors: req.body.errors,
          success: false,
        });

      if (req.body.isAdmin === false) {
        return res.status(401).end();
      }

      const productsCategoryData = {
        categoryName: req.body.categoryName,
        categoryDescriptor: req.body.categoryDescriptor,
        isPrimaryCategory: !req.body.categoryParent,
        categoryParent: req.body.categoryParent,
        categoryDescription: req.body.categoryDescription,
        categoryMiniature: req.body.categoryMiniature,
      };

      const newProductsCategory = new ProductsCategories(productsCategoryData);
      newProductsCategory.save((err) => {
        if (err && err.name === 'MongoError' && err.code === 11000) {
          return res.status(400).json({
            message: 'A category with this name or descriptor already exists.',
            success: false,
          });
        } else return res.json({
          success: true,
        });
      });
    });

router.get('/get-categories', (req, res) => {
  ProductsCategories.find({}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        message: 'Fetching error',
      });
    } else if (!categories) {
      return res.status(404).json({
        message: 'No records found',
      });
    } else return res.json({
      categories: categories,
    });
  }).sort({ createdAt: -1 });
});

router.post('/delete-categories', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  let success = false;
  const selectedRowsDescriptors = JSON.parse(req.body.selectedRowsDescriptors);
  Object.keys(selectedRowsDescriptors).map((i) => {
    ProductsCategories.deleteMany(
        { categoryDescriptor: selectedRowsDescriptors[i].descriptor },
        (err) => {
          if (err) {
            return res.status(400).json({
              message: 'An error has occurred',
            });
          }

          success = true;
        });
  });

  return res.json({
    success: success,
  });
});

module.exports = router;
