import {
  ON_SITE_NAVIGATION_CHANGE,
  ON_SLIDER_IMAGES_CHANGE,
  ON_TOP_PROMOTIONAL_BANNER_CHANGE,
} from '../../modules/actionTypes.js';

export default function settingsReducer(
    state = {
      shouldUpdateSiteNavigation: false,
      shouldUpdateImagesSlider: false,
      shouldUpdateTopPromotionalBanner: false,
    }, action) {
  switch (action.type) {
    case ON_SITE_NAVIGATION_CHANGE:
      return {
        ...state,
        shouldUpdateSiteNavigation: !state.shouldUpdateSiteNavigation,
      };
    case ON_SLIDER_IMAGES_CHANGE:
      return {
        ...state,
        shouldUpdateImagesSlider: !state.shouldUpdateSiteNavigation,
      };
    case ON_TOP_PROMOTIONAL_BANNER_CHANGE:
      return {
        ...state,
        shouldUpdateTopPromotionalBanner: !state.shouldUpdateTopPromotionalBanner,
      };
    default:
      return state;
  }
};
