import axios from 'axios';
import { setAuthToken } from 'utils/setAuthToken';
import { getUserCoins, removeUserCoins } from './usercoins';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_USERLIST,
  USERLIST_ERROR,
} from './types';

// Add user's coinlist (first time)
export const addUserList = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/coins', {}, config);
    dispatch({ type: ADD_USERLIST, payload: res.data });
  } catch (err) {
    dispatch({ type: USERLIST_ERROR, payload: err.response.msg });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const registerUser = (formData) => async (dispatch) => {
  const { name, email, password } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(getUserCoins());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  const { email, password } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(getUserCoins());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

// Logout
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(removeUserCoins());
};

// Clear Errors
export const clearErrors = () => (dispatch) => dispatch({ type: CLEAR_ERRORS });
