const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  currency: {
    type: Array,
    default: [],
  },
  siteNavigation: {
    type: Array,
    default: [],
  },
  sliderImages: {
    type: Array,
    default: [],
  },
  topPromotionalBanner: {
    type: Object,
    default: {},
  },
  leftIndexPromotionsDesktop: {
    type: Object,
    default: {},
  },
  rightIndexPromotionsDesktop: {
    type: Object,
    default: {},
  },
  footerIndexPromotionsDesktop: {
    type: Object,
    default: {},
  },
  indexPromotionsNewArrivals: {
    type: Array,
    default: [],
  },
  indexSalesTopPosterDesktop: {
    type: Object,
    default: {},
  },
  indexSalesMiddleImagesDesktop: {
    type: Array,
    default: [],
  },
  indexSalesMiddlePosterDesktop: {
    type: Object,
    default: {},
  },
  indexSalesBottomImagesDesktop: {
    type: Array,
    default: [],
  },
  indexImagesMobile: {
    type: Array,
    default: [],
  },
  footerLeftColumn: {
    type: Array,
    default: [],
  },
  footerCenterColumn: {
    type: Array,
    default: [],
  },
  footerRightColumn: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
