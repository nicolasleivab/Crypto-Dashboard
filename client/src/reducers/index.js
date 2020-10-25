import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import allcoins from './allcoins';
import modal from './modal';
import usercoins from './usercoins';

export default combineReducers({
  alert,
  auth,
  allcoins,
  modal,
  usercoins,
});
