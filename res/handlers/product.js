const Product = require('mongoose').model('Product');
const ProductsTags = require('mongoose').model('ProductsTags');
const ProductsCategories = require('mongoose').model('ProductsCategories');
const express = require('express');

const router = new express.Router();

const addProductFormValidation = require(
    '../middleware/add-product-form-validation.js');

const regularSearchFormValidation = require(
    '../middleware/regular-sale-form-validation.js',
);

const authValidation = require(
    '../middleware/auth-validation.js',
);

router.post('/add-product', addProductFormValidation, authValidation,
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

      Product.find({}, (err, products) => {

        for (let i = 0; i < products.length; i++) {
          Product.updateOne({ _id: { $eq: products[i]._id } }, {
            $set: {
              orderInList: products[i].orderInList + 1,
            },
          }, () => {
            return 0;
          });
        }

        const productData = {
          productName: req.body.productName,
          productLink: req.body.productLink,
          productCategory: JSON.parse(req.body.productCategory).length > 0 ?
              JSON.parse(req.body.productCategory) :
              ['Uncategorized'],
          productDescription: req.body.productDescription,
          productThumbnail: req.body.productThumbnail,
          productPictures: JSON.parse(req.body.productPictures),
          sku: req.body.sku,
          productPrice: req.body.productPrice,
          salePrice: req.body.salePrice,
          stockStatus: req.body.stockStatus,
          showStockQuantity: req.body.showStockQuantity,
          stockQuantity: req.body.stockQuantity,
          shippingFee: req.body.availableInStore ? 0 : req.body.shippingFee,
          availableInStore: req.body.availableInStore,
          upSellLink: req.body.upSellLink,
          crossSellLink: req.body.crossSellLink,
          tags: JSON.parse(req.body.tags),
          productFeatured: req.body.productFeatured,
          productVisibility: req.body.productVisibility,
          orderInList: 1,
        };

        JSON.parse(req.body.productCategory).map((category) => {
          ProductsCategories.find(
              { categoryName: { $regex: category, $options: 'i' } },
              (err, categoryFound) => {
                if (err) {
                  return res.status(400).json({
                    message: 'Internal error',
                  });
                } else {
                  ProductsCategories.updateOne(
                      { categoryName: categoryFound[0].categoryName }, {
                        $set: { usedNTimes: categoryFound[0].usedNTimes + 1 },
                      }, () => {
                      });
                }
              });
        });

        JSON.parse(req.body.tags).map((tag) => {
          ProductsTags.find({ tagName: { $regex: tag, $options: 'i' } },
              (err, tagFound) => {
                if (err) {
                  return res.status(400).json({
                    message: 'Internal error',
                  });
                } else if (tagFound.length === 0) {
                  // Save the tag if it doesn't exist

                  const capitalizedTag = tag.charAt(0).toUpperCase() +
                      tag.slice(1);

                  const tagData = {
                    tagName: capitalizedTag,
                  };
                  const newTag = new ProductsTags(tagData);
                  newTag.save();

                } else {

                  // Update the current tag to have +1 more usage
                  ProductsTags.updateOne({ tagName: tagFound[0].tagName }, {
                    $set: { usedNTimes: tagFound[0].usedNTimes + 1 },
                  }, () => {
                  });
                }
              });
        });

        const newProduct = new Product(productData);
        newProduct.save((err) => {
          if (err && err.name === 'MongoError' && err.code === 11000) {
            return res.status(400).json({
              message: 'A product with this permalink already exists.',
              success: false,
            });
          } else return res.json({
            success: true,
          });
        });
      });
    });

router.get('/get-products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({
        message: 'Fetching error',
      });
    } else if (!products) {
      return res.status(404).json({
        message: 'No records found',
      });
    } else return res.json({
      products: products,
    });
  }).sort({ orderInList: 1 });
});

router.post('/toggle-featured', (req, res) => {
  Product.find({ _id: req.body.id }, (err, product) => {
    Product.updateOne({ _id: { $eq: req.body.id } }, {
      $set: { productFeatured: !product[0].productFeatured },
    }, (err) => {
      if (err) {
        return res.status(400).json({
          message: 'An error has occurred.',
        });
      } else return res.json({
        success: true,
      });
    });
  });
});

router.post('/delete-products', (req, res) => {
  let success = false;
  const selectedRowsId = JSON.parse(req.body.selectedRowsId);
  Object.keys(selectedRowsId).map((i) => {
    Product.deleteMany({
      _id: selectedRowsId[i].id,
    }, (err) => {
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

router.post('/quick-edit-product', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Product.find({ _id: req.body.id }, (err, product) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else if (!product) {
      return res.status(404).json({
        message: 'No records found.',
      });
    } else return res.json({
      product: product,
    });
  });
});

router.post('/edit-product', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Product.find({ productLink: req.body.productLink }, (err, product) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else if (!product) {
      return res.status(404).json({
        message: 'No records found.',
      });
    } else return res.json({
      product: product,
    });
  });
});

router.post('/view-product', (req, res) => {
  Product.find({ _id: req.body.productId }, (err, product) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else if (!product) {
      return res.status(404).json({
        message: 'No records found.',
      });
    } else return res.json({
      product: product,
    });
  });
});

router.post('/quick-edit-product-save', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Product.updateOne({ _id: { $eq: req.body.id } }, {
    $set: {
      productName: req.body.productName,
      productCategory: JSON.parse(req.body.productCategory).length > 0 ?
          JSON.parse(req.body.productCategory) :
          ['Uncategorized'],
      sku: req.body.sku,
      productPrice: req.body.productPrice,
      salePrice: req.body.salePrice,
      stockStatus: req.body.stockStatus,
      availableInStore: req.body.availableInStore,
      tags: JSON.parse(req.body.tags),
      productVisibility: req.body.productVisibility,
    },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.post('/edit-product-save', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Product.updateOne({ _id: { $eq: req.body.id } }, {
    $set: {
      productName: req.body.productName,
      productLink: req.body.productLink,
      productCategory: JSON.parse(req.body.productCategory).length > 0 ?
          JSON.parse(req.body.productCategory) :
          ['Uncategorized'],
      productDescription: req.body.productDescription,
      productThumbnail: req.body.productThumbnail,
      productPictures: JSON.parse(req.body.productPictures),
      sku: req.body.sku,
      productPrice: req.body.productPrice,
      salePrice: req.body.salePrice,
      stockStatus: req.body.stockStatus,
      showStockQuantity: req.body.showStockQuantity,
      stockQuantity: req.body.stockQuantity,
      shippingFee: req.body.shippingFee,
      availableInStore: req.body.availableInStore,
      upSellLink: req.body.upSellLink,
      crossSellLink: req.body.crossSellLink,
      tags: JSON.parse(req.body.tags),
      productFeatured: req.body.productFeatured,
      productVisibility: req.body.productVisibility,
    },
  }, (err) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      success: true,
    });
  });
});

router.post('/get-products-regular-sale', regularSearchFormValidation,
    (req, res) => {
      if (!req.body.success)
        return res.status(400).json({
          message: req.body.message,
          errors: req.body.errors,
          success: false,
        });

      Product.find({
        $or: [
          {
            productCategory: {
              $regex: '.*' + req.body.searchTerm + '.*',
              $options: 'i',
            },
          },
          {
            productName: {
              $regex: '.*' + req.body.searchTerm + '.*',
              $options: 'i',
            },
          },
          {
            tags: {
              $regex: '.*' + req.body.searchTerm + '.*',
              $options: 'i',
            },
          },
        ],
      }, (err, products) => {
        if (err) {
          return res.status(400).json({
            message: 'An error has occurred.',
          });
        } else return res.json({
          products: products,
        });
      }).sort({ featured: 1 });
    });

router.get('/get-all-tags', (req, res) => {
  ProductsTags.find({}, (err, tags) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else return res.json({
      tags: tags,
    });
  });
});

module.exports = router;
