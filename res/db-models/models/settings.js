const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  currency: {
    type: Array,
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
