const Product = require('mongoose').model('Product');
const express = require('express');

const router = new express.Router();

const addProductFormValidation = require(
    '../middleware/add-product-form-validation.js');

router.post('/add-product', addProductFormValidation, (req, res) => {
  if (!req.body.success)
    return res.status(400).json({
      message: req.body.message,
      errors: req.body.errors,
      success: false,
    });

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
      shippingFee: req.body.shippingFee,
      availableInStore: req.body.availableInStore,
      upSellLink: req.body.upSellLink,
      crossSellLink: req.body.crossSellLink,
      tags: JSON.parse(req.body.tags),
      productFeatured: req.body.productFeatured,
      productVisibility: req.body.productVisibility,
      orderInList: 1,
    };

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

router.post('/quick-edit-product', (req, res) => {
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

router.post('/edit-product', (req, res) => {
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

router.post('/quick-edit-product-save', (req, res) => {
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

router.post('/edit-product-save', (req, res) => {
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

module.exports = router;
