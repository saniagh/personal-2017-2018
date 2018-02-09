const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  currency: {
    type: Array,
  },
  siteNavigation: {
    type: Array,
  },
  sliderImages: {
    type: Array,
  },
  topPromotionalBanner: {
    type: Object,
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
