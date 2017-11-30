import { ON_CHOOSE_IMAGE } from '../../modules/actionTypes.js';

export default function uploadReducer(
    state = {
      imageUrl: '',
    }, action) {
  switch (action.type) {
    case ON_CHOOSE_IMAGE:
      return {
        ...state,
        imageUrl: action.imageUrl,
      };
    default:
      return state;
  }
};
