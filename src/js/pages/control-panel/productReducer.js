import {
  SHOW_UPLOADS_MULTIPLE_MODAL,
  HIDE_UPLOADS_MULTIPLE_MODAL,
} from '../../modules/actionTypes.js';

export default function productReducer(
    state = {
      isModalVisible: false,
    }, action) {
  switch (action.type) {
    case SHOW_UPLOADS_MULTIPLE_MODAL:
      return {
        ...state,
        isModalVisible: true,
      };
    case HIDE_UPLOADS_MULTIPLE_MODAL:
      return {
        ...state,
        isModalVisible: false,
      };
    default:
      return state;
  }
};
