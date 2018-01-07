import {
  ON_CHOOSE_IMAGE,
  ON_CHOOSE_MULTIPLE_IMAGES,
} from '../../modules/actionTypes.js';

export function onChooseImage(imageUrl) {
  return { type: ON_CHOOSE_IMAGE, imageUrl: imageUrl };
}

export function onChooseMultipleImages(imageUrlsArray) {
  return { type: ON_CHOOSE_MULTIPLE_IMAGES, imageUrlsArray: imageUrlsArray };
}
