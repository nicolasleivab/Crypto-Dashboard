import React, { useReducer } from "react";
import axios from "axios";
import UsercoinsContext from "./usercoinsContext";
import usercoinsReducer from "./usercoinsReducer";
import {
  GET_USERCOINS,
  USERCOINS_ERROR,
  DELETE_COIN,
  ADD_COIN,
  EDIT_COIN,
  COIN_ERROR,
  GET_PRICEACTION,
} from "../types";

const UsercoinsState = (props) => {
  const initialState = {
    userCoins: [],
    errors: null,
    priceAction: [],
  };
  const [state, dispatch] = useReducer(usercoinsReducer, initialState);

  // Get User coins
  const getUserCoins = async () => {
    try {
      const res = await axios.get("/api/coins");

      dispatch({
        type: GET_USERCOINS,
        payload: res.data[0],
      });
    } catch (err) {
      dispatch({ type: USERCOINS_ERROR });
    }
  };

  // Add Coin
  const addCoin = async (userId, coin) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
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
  const deleteCoin = async (userId, coin) => {
    try {
      await axios.delete(`/api/coins/${userId}/${coin}`);

      dispatch({ type: DELETE_COIN, payload: coin });
    } catch (err) {
      dispatch({ type: COIN_ERROR, payload: err.response.msg });
    }
  };

  // Edit Coin
  const editCoin = async (userId, currentCoin, coin) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
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
  const getPriceAction = (coins) => {
    const request = new XMLHttpRequest();
    const priceAction = [];
    //request loop
    (function loop(i, length) {
      if (i >= length) {
        return;
      }
      let url =
        "https://api.coincap.io/v2/assets/" + coins[i] + "/history?interval=d1";

      request.open("GET", url);
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

  return (
    <UsercoinsContext.Provider
      value={{
        userCoins: state.userCoins,
        errors: state.errors,
        priceAction: state.priceAction,
        getUserCoins,
        deleteCoin,
        addCoin,
        editCoin,
        getPriceAction,
      }}
    >
      {props.children}
    </UsercoinsContext.Provider>
  );
};

export default UsercoinsState;
