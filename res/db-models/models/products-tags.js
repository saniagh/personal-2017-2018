const mongoose = require('mongoose');

const ProductsTagsSchema = new mongoose.Schema({
  tagName: {
    type: String,
    index: { unique: true },
  },
  usedNTimes: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('ProductsTags', ProductsTagsSchema);
