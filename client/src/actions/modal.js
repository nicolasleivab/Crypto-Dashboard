import {
  SET_MODAL,
  HIDE_MODAL,
  EDIT_MODE,
  SET_CURRENT,
  ADD_MODE,
} from './types';

// Set Modal
export const setModal = () => (dispatch) => {
  dispatch({ type: SET_MODAL });
};
// Hide Modal
export const hideModal = () => (dispatch) => {
  dispatch({ type: HIDE_MODAL });
};
// set edit mode
export const setEdit = (bool) => (dispatch) => {
  dispatch({ type: EDIT_MODE, payload: bool });
};
// set add coin mode
export const setAdd = (bool) => (dispatch) => {
  dispatch({ type: ADD_MODE, payload: bool });
};
//set current
export const setCurrent = (coin) => (dispatch) => {
  dispatch({ type: SET_CURRENT, payload: coin });
};
