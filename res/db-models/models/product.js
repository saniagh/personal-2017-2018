const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productLink: {
    type: String,
    index: { unique: true },
  },
  productCategory: {
    type: Array,
  },
  productDescription: {
    type: String,
  },
  productPicture: {
    type: String,
  },
  sku: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
    default: '',
  },
  stockStatus: {
    type: Boolean,
  },
  showStockQuantity: {
    type: Boolean,
  },
  stockQuantity: {
    type: Number,
  },
  shippingFee: {
    type: Number,
  },
  availableInStore: {
    type: Boolean,
  },
  upSellLink: {
    type: String,
    default: '',
  },
  crossSellLink: {
    type: String,
    default: '',
  },
  tags: {
    type: Array,
  },
  productFeatured: {
    type: Boolean,
  },
  productStatus: {
    type: String,
  },
  productVisibility: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  viewCount: {
    type: Number,
  },
  orderInList: {
    type: Number,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
