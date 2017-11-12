import {
  ON_USERNAME_OR_EMAIL_CHANGE_LOGIN,
  ON_PASSWORD_CHANGE_LOGIN,
  ON_LOGIN_INITIATE,
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAILURE,
  ON_CLEAR_STATUS_ERRORS_MESSAGE_LOGIN,
  ON_USERNAME_CHANGE_SIGNUP,
  ON_EMAIL_CHANGE_SIGNUP,
  ON_PASSWORD_CHANGE_SIGNUP,
  ON_CONFIRM_PASSWORD_CHANGE_SIGNUP,
  ON_SIGNUP_INITIATE,
  ON_SIGNUP_SUCCESS,
  ON_SIGNUP_FAILURE,
  ON_CLEAR_STATUS_ERRORS_MESSAGE_SIGNUP,
} from '../../modules/actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../modules/Auth.js';

export function onUsernameOrEmailChangeAction(usernameOrEmail) {
  return function (dispatch) {
    dispatch({
      type: ON_USERNAME_OR_EMAIL_CHANGE_LOGIN,
      usernameOrEmail: usernameOrEmail,
    });
  };
}

export function onLoginPasswordChangeAction(password) {
  return function (dispatch) {
    dispatch({
      type: ON_PASSWORD_CHANGE_LOGIN,
      password: password,
    });
  };
}

export function onLoginInitiate() {
  return { type: ON_LOGIN_INITIATE };
}

export function onLoginSuccess() {
  return { type: ON_LOGIN_SUCCESS };
}

export function onLoginFailure(errors, message) {
  return {
    type: ON_LOGIN_FAILURE,
    errors: errors ? errors : {},
    message: message,
  };
}

export function onLoginRequestAction(usernameOrEmail, password) {
  return function (dispatch) {
    dispatch(onLoginInitiate());
    return axios({
      method: 'post',
      url: '/authentication/login',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        usernameOrEmail: usernameOrEmail,
        password: password,
      }),
    }).then((res) => {
      Auth.authenticateUser(res.data.token);
      dispatch(onLoginSuccess());
    }).catch((err) => {
      dispatch(
          onLoginFailure(err.response.data.errors, err.response.data.message));
    });
  };
}

export function onClearStatusErrorsMessageLoginAction() {
  return { type: ON_CLEAR_STATUS_ERRORS_MESSAGE_LOGIN };
}

export function onUsernameChangeAction(username) {
  return function (dispatch) {
    dispatch({
      type: ON_USERNAME_CHANGE_SIGNUP,
      username: username,
    });
  };
}

export function onEmailChangeAction(email) {
  return function (dispatch) {
    dispatch({
      type: ON_EMAIL_CHANGE_SIGNUP,
      email: email,
    });
  };
}

export function onPasswordChangeAction(password) {
  return function (dispatch) {
    dispatch({
      type: ON_PASSWORD_CHANGE_SIGNUP,
      password: password,
    });
  };
}

export function onConfirmPasswordChangeAction(confirmPassword) {
  return function (dispatch) {
    dispatch({
      type: ON_CONFIRM_PASSWORD_CHANGE_SIGNUP,
      confirmPassword: confirmPassword,
    });
  };
}

export function onSignupInitiate() {
  return { type: ON_SIGNUP_INITIATE };
}

export function onSignupSuccess() {
  return { type: ON_SIGNUP_SUCCESS };
}

export function onSignupFailure(errors, message) {
  return {
    type: ON_SIGNUP_FAILURE,
    errors: errors,
    message: message,
  };
}

export function onSignupRequestAction(
    username, email, password, confirmPassword) {
  return function (dispatch) {
    dispatch(onSignupInitiate());
    return axios({
      method: 'post',
      url: '/authentication/signup',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    }).then((res) => {
      Auth.authenticateUser(res.data.token);
      dispatch(onSignupSuccess());
    }).catch((err) => {
      dispatch(
          onSignupFailure(
              err.response.data.errors ? err.response.data.errors : {},
              err.response.data.message));
    });
  };
}

export function onClearStatusErrorsMessageSignupAction() {
  return { type: ON_CLEAR_STATUS_ERRORS_MESSAGE_SIGNUP };
}
