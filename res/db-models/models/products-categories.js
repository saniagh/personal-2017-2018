const mongoose = require('mongoose');

const ProductsCategoriesSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    index: { unique: true },
  },
  categoryDescriptor: {
    type: String,
    index: { unique: true },
  },
  isPrimaryCategory: {
    type: Boolean,
  },
  categoryParent: {
    type: String,
    default: '',
  },
  categoryDescription: {
    type: String,
    default: '',
  },
  categoryMiniature: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProductsCategories', ProductsCategoriesSchema);
