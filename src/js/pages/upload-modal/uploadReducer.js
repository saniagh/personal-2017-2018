import {
  ON_CHOOSE_IMAGE,
  ON_CHOOSE_MULTIPLE_IMAGES,
} from '../../modules/actionTypes.js';

export default function uploadReducer(
    state = {
      imageUrl: '',
      imageUrlsArray: [],
    }, action) {
  switch (action.type) {
    case ON_CHOOSE_IMAGE:
      return {
        ...state,
        imageUrl: action.imageUrl,
      };
    case ON_CHOOSE_MULTIPLE_IMAGES:
      return {
        ...state,
        imageUrlsArray: action.imageUrlsArray,
      };
    default:
      return state;
  }
};
