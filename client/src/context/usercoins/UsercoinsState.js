import React, { useReducer } from "react";
import axios from "axios";
import UsercoinsContext from "./usercoinsContext";
import usercoinsReducer from "./usercoinsReducer";
import { GET_USERCOINS, USERCOINS_ERROR } from "../types";

const UsercoinsState = (props) => {
  const initialState = {
    userCoins: [],
    errors: null,
  };
  const [state, dispatch] = useReducer(usercoinsReducer, initialState);

  // Add user's coinlist (first time)
  const addUserList = async () => {};

  // Get User coins
  const getUserCoins = async () => {
    try {
      const res = await axios.get("/api/coins");

      dispatch({
        type: GET_USERCOINS,
        payload: res.data[0].coins,
      });
    } catch (err) {
      dispatch({ type: USERCOINS_ERROR });
    }
  };

  return (
    <UsercoinsContext.Provider
      value={{
        userCoins: state.userCoins,
        errors: state.errors,
        getUserCoins,
      }}
    >
      {props.children}
    </UsercoinsContext.Provider>
  );
};

export default UsercoinsState;
