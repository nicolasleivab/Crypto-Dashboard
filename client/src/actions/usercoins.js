import axios from 'axios';
import {
  GET_USERCOINS,
  USERCOINS_ERROR,
  DELETE_COIN,
  ADD_COIN,
  EDIT_COIN,
  COIN_ERROR,
  GET_PRICEACTION,
} from '../types';

// Get User coins
export const getUserCoins = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/coins');

    dispatch({
      type: GET_USERCOINS,
      payload: res.data[0],
    });
  } catch (err) {
    dispatch({ type: USERCOINS_ERROR });
  }
};

// Add Coin
export const addCoin = (userId, coin) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.put(`/api/coins/${userId}`, coin, config);
    dispatch({ type: ADD_COIN, payload: coin });
  } catch (err) {
    dispatch({ type: COIN_ERROR, payload: err.response.msg });
  }
};

// Delete Coin
export const deleteCoin = (userId, coin) => async (dispatch) => {
  try {
    await axios.delete(`/api/coins/${userId}/${coin}`);

    dispatch({ type: DELETE_COIN, payload: coin });
  } catch (err) {
    dispatch({ type: COIN_ERROR, payload: err.response.msg });
  }
};

// Edit Coin
export const editCoin = (userId, currentCoin, coin) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.put(`/api/coins/${userId}/${currentCoin}`, coin, config);

    dispatch({
      type: EDIT_COIN,
      payload: { current: currentCoin, new: coin },
    });
  } catch (err) {
    dispatch({ type: COIN_ERROR, payload: err.response.msg });
  }
};

// Get userscoin price action
export const getPriceAction = (coins) => (dispatch) => {
  const request = new XMLHttpRequest();
  const priceAction = [];
  //request loop
  (function loop(i, length) {
    if (i >= length) {
      return;
    }
    let url =
      'https://api.coincap.io/v2/assets/' + coins[i] + '/history?interval=d1';

    request.open('GET', url);
    request.onreadystatechange = function () {
      if (
        request.readyState === XMLHttpRequest.DONE &&
        request.status === 200
      ) {
        //so we can get the elements in order
        const data = JSON.parse(request.responseText);
        const prices = data.data;
        if (data.data.length >= 365) {
          priceAction.push(prices);
        } else {
          alert(`No data available for ${coins[i]}`);
          deleteCoin(state.userCoins._id, coins[i]);
        }

        if (i === coins.length - 1) {
          dispatch({
            type: GET_PRICEACTION,
            payload: priceAction,
          });
        }
        loop(i + 1, length);
      }
    };
    request.send();
  })(0, coins.length);
};
