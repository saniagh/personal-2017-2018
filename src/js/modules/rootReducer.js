import { combineReducers } from 'redux';
import authReducer from '../pages/auth/authReducer.js';
import homeReducer from '../pages/home/homeReducer.js';
import navigationReducer from '../pages/universal/navigationReducer.js';
import uploadReducer from '../pages/upload-modal/uploadReducer.js';
import categoriesReducer from '../pages/control-panel/categoriesReducer.js';
import productReducer from '../pages/control-panel/productReducer.js';

const rootReducer = combineReducers({
  authReducer: authReducer,
  homeReducer: homeReducer,
  navigationReducer: navigationReducer,
  uploadReducer: uploadReducer,
  categoriesReducer: categoriesReducer,
  productReducer: productReducer,
});

export default rootReducer;
