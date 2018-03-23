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
  leftIndexPromotionsDesktop: {
    type: Object,
  },
  rightIndexPromotionsDesktop: {
    type: Object,
  },
  footerIndexPromotionsDesktop: {
    type: Object,
  },
  indexPromotionsNewArrivals: {
    type: Array,
  },
  indexSalesTopPosterDesktop: {
    type: Object,
  },
  indexSalesMiddleImagesDesktop: {
    type: Array,
  },
  indexSalesMiddlePosterDesktop: {
    type: Object,
  },
  indexSalesBottomImagesDesktop: {
    type: Array,
  },
  indexImagesMobile: {
    type: Array,
  },
  footerLeftColumn: {
    type: Array,
  },
  footerCenterColumn: {
    type: Array,
  },
  footerRightColumn: {
    type: Array,
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
