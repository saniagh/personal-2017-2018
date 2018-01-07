import {
  SHOW_UPLOADS_MULTIPLE_MODAL,
  HIDE_UPLOADS_MULTIPLE_MODAL,
} from '../../modules/actionTypes.js';

export function onShowUploadsMultipleModalAction() {
  return function (dispatch) {
    dispatch({
      type: SHOW_UPLOADS_MULTIPLE_MODAL,
    });
  };
}

export function onHideUploadsMultipleModalAction() {
  return function (dispatch) {
    dispatch({
      type: HIDE_UPLOADS_MULTIPLE_MODAL,
    });
  };
}
