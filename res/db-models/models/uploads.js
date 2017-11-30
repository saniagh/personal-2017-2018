const mongoose = require('mongoose');

const Uploads = new mongoose.Schema({
  displayName: {
    type: String,
  },
  uniqueName: {
    type: String,
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Uploads', Uploads);
