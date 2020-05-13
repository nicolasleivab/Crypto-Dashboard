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
} from "../types";

const UsercoinsState = (props) => {
  const initialState = {
    userCoins: [],
    errors: null,
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
      const res = await axios.put(`/api/coins/${userId}`, coin, config);
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

  return (
    <UsercoinsContext.Provider
      value={{
        userCoins: state.userCoins,
        errors: state.errors,
        getUserCoins,
        deleteCoin,
        addCoin,
        editCoin,
      }}
    >
      {props.children}
    </UsercoinsContext.Provider>
  );
};

export default UsercoinsState;
