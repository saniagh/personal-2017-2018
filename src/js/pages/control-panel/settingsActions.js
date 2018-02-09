import {
  ON_SITE_NAVIGATION_CHANGE,
  ON_SLIDER_IMAGES_CHANGE,
  ON_TOP_PROMOTIONAL_BANNER_CHANGE,
} from '../../modules/actionTypes.js';

export function onSiteNavigationChange() {
  return { type: ON_SITE_NAVIGATION_CHANGE };
}

export function onImagesSliderChange() {
  return { type: ON_SLIDER_IMAGES_CHANGE };
}

export function onTopPromotionalBannerChange() {
  return { type: ON_TOP_PROMOTIONAL_BANNER_CHANGE };
}
