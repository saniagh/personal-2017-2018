import {
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_SIGNUP_MODAL,
  HIDE_SIGNUP_MODAL,
  ON_OPEN_SHOPPING_CART,
  ON_CLOSE_SHOPPING_CART,
  REHYDRATE_SHOPPING_CART_STATE,
  ON_ADD_PRODUCT_TO_CART,
  ON_REMOVE_PRODUCT_FROM_CART,
} from '../../modules/actionTypes.js';

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

export function onShowSignupModalAction() {
  return function (dispatch) {
    dispatch({
      type: SHOW_SIGNUP_MODAL,
    });
  };
}

export function onHideSignupModalAction() {
  return function (dispatch) {
    dispatch({
      type: HIDE_SIGNUP_MODAL,
    });
  };
}

export function onOpenShoppingCartAction() {
  return function (dispatch) {
    dispatch({
      type: ON_OPEN_SHOPPING_CART,
    });
  };
}

export function onCloseShoppingCartAction() {
  return function (dispatch) {
    dispatch({
      type: ON_CLOSE_SHOPPING_CART,
    });
  };
}

export function onRehydrateShoppingCartState() {
  return function (dispatch) {
    dispatch({
      type: REHYDRATE_SHOPPING_CART_STATE,
    });
  };
}

export function onAddProductToCart(product, qty) {
  return function (dispatch) {
    dispatch({
      type: ON_ADD_PRODUCT_TO_CART,
      product: product,
      qty: qty,
    });
  };
}

export function onRemoveProductFromCart(index) {
  return function (dispatch) {
    dispatch({
      type: ON_REMOVE_PRODUCT_FROM_CART,
      index: index,
    });
  };
}
