import {
  SHOW_UPLOADS_MODAL,
  HIDE_UPLOADS_MODAL,
} from '../../modules/actionTypes.js';

export default function categoriesReducer(
    state = {
      isModalVisible: false,
    }, action) {
  switch (action.type) {
    case SHOW_UPLOADS_MODAL:
      return {
        ...state,
        isModalVisible: true,
      };
    case HIDE_UPLOADS_MODAL:
      return {
        ...state,
        isModalVisible: false,
      };
    default:
      return state;
  }
};
