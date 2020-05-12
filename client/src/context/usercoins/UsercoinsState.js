import React, { useReducer } from "react";
import axios from "axios";
import UsercoinsContext from "./usercoinsContext";
import usercoinsReducer from "./usercoinsReducer";
import {
  GET_USERCOINS,
  USERCOINS_ERROR,
  ADD_USERLIST,
  USERLIST_ERROR,
  DELETE_COIN,
  COIN_ERROR,
} from "../types";

const UsercoinsState = (props) => {
  const initialState = {
    userCoins: [],
    errors: null,
  };
  const [state, dispatch] = useReducer(usercoinsReducer, initialState);

  // Add user's coinlist (first time)
  const addUserList = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/coins", {}, config);
      dispatch({ type: ADD_USERLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: USERLIST_ERROR, payload: err.response.msg });
    }
  };

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

  // Delete Coin
  const deleteCoin = async (userId, coin) => {
    try {
      await axios.delete(`/api/coins/${userId}/${coin}`);

      dispatch({ type: DELETE_COIN, payload: coin });
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
        addUserList,
        deleteCoin,
      }}
    >
      {props.children}
    </UsercoinsContext.Provider>
  );
};

export default UsercoinsState;
