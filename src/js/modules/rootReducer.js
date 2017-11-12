import { combineReducers } from 'redux';
import authReducer from '../pages/auth/authReducer.js';
import homeReducer from '../pages/home/homeReducer.js';
import navigationReducer from '../pages/universal/navigationReducer.js';

const rootReducer = combineReducers({
  authReducer: authReducer,
  homeReducer: homeReducer,
  navigationReducer: navigationReducer,
});

export default rootReducer;
