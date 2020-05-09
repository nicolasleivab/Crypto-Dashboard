import React, { useReducer } from "react";
import axios from "axios";
import AllcoinsContext from "./allcoinsContext";
import allcoinsReducer from "./allcoinsReducer";
import { GET_ALLCOINS, ALLCOINS_ERROR } from "../types";

const AllcoinsState = (props) => {
  const initialState = {
    coins: [],
    priceAction: [],
    errors: null,
  };
  const [state, dispatch] = useReducer(allcoinsReducer, initialState);

  // Get top coins from coincapapi
  const getAllCoins = async () => {
    try {
      const res = await axios.get("https://api.coincap.io/v2/assets");

      dispatch({
        type: GET_ALLCOINS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: ALLCOINS_ERROR });
    }
  };

  return (
    <AllcoinsContext.Provider
      value={{
        coins: state.coins,
        priceAction: state.priceAction,
        errors: state.errors,
        getAllCoins,
      }}
    >
      {props.children}
    </AllcoinsContext.Provider>
  );
};

export default AllcoinsState;
