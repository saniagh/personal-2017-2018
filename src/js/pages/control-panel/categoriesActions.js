import {
  SHOW_UPLOADS_MODAL,
  HIDE_UPLOADS_MODAL,
} from '../../modules/actionTypes.js';

export function onShowUploadsModalAction() {
  return function (dispatch) {
    dispatch({
      type: SHOW_UPLOADS_MODAL,
    });
  };
}

export function onHideUploadsModalAction() {
  return function (dispatch) {
    dispatch({
      type: HIDE_UPLOADS_MODAL,
    });
  };
}
