import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
} from '../../modules/actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../modules/Auth.js';

export function onShowLoginModalAction() {
  return function (dispatch) {
    dispatch({
      type: SHOW_LOGIN_MODAL,
    });
  };
}

export function onHideLoginModalAction() {
  return function (dispatch) {
    dispatch({
      type: HIDE_LOGIN_MODAL,
    });
  };
}