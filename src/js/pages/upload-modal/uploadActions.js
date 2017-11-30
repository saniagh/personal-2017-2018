import { ON_CHOOSE_IMAGE } from '../../modules/actionTypes.js';

export function onChooseImage(imageUrl) {
  return { type: ON_CHOOSE_IMAGE, imageUrl: imageUrl };
}
