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

export default function navigationReducer(
    state = {
      login: {
        isModalVisible: false,
      },
      signup: {
        isModalVisible: false,
      },
      shoppingCart: {
        isModalVisible: false,
        products: [],
      },
    }, action) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return {
        ...state,
        login: {
          isModalVisible: true,
        },
      };
    case HIDE_LOGIN_MODAL:
      return {
        ...state,
        login: {
          isModalVisible: false,
        },
      };
    case SHOW_SIGNUP_MODAL:
      return {
        ...state,
        signup: {
          isModalVisible: true,
        },
      };
    case HIDE_SIGNUP_MODAL:
      return {
        ...state,
        signup: {
          isModalVisible: false,
        },
      };
    case ON_OPEN_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          isModalVisible: true,
        },
      };
    case ON_CLOSE_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          isModalVisible: false,
        },
      };
    case REHYDRATE_SHOPPING_CART_STATE: {
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          products: JSON.parse(localStorage.getItem('products')),
        },
      };
    }

    case ON_ADD_PRODUCT_TO_CART: {
      const newProducts = state.shoppingCart.products;
      newProducts.push({
        product: action.product,
        qty: action.qty,
      });
      localStorage.setItem('products', JSON.stringify(newProducts));
      localStorage.setItem('cartLastModified', JSON.stringify(Date.now()));
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          products: newProducts,
        },
      };
    }

    case ON_REMOVE_PRODUCT_FROM_CART: {
      const newProducts = state.shoppingCart.products.filter(
          (s, j) => action.index !== j);
      localStorage.setItem('products', JSON.stringify(newProducts));
      localStorage.setItem('cartLastModified', JSON.stringify(Date.now()));
      return {
        ...state,
        shoppingCart: {
          ...state.shoppingCart,
          products: newProducts,
        },
      };
    }

    default:
      return state;
  }
};
