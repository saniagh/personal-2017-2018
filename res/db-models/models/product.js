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
    default: ['Uncategorized'],
  },
  productDescription: {
    type: String,
    default: '<p></p>',
  },
  productThumbnail: {
    type: String,
    default: '',
  },
  productPictures: {
    type: Array,
    default: [],
  },
  sku: {
    type: String,
    default: '',
  },
  productPrice: {
    type: String,
  },
  salePrice: {
    type: String,
    default: '',
  },
  stockStatus: {
    type: Boolean,
    default: true,
  },
  showStockQuantity: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  shippingFee: {
    type: Number,
    default: 0,
  },
  availableInStore: {
    type: Boolean,
    default: false,
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
    default: [],
  },
  productFeatured: {
    type: Boolean,
    default: false,
  },
  productStatus: {
    type: String,
    default: 'Published',
  },
  productVisibility: {
    type: Boolean,
    default: true,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
  latestModification: {
    type: Date,
    default: Date.now(),
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  orderInList: {
    type: Number,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
