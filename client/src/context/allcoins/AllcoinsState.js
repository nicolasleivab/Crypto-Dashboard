import React, { useReducer } from "react";
import axios from "axios";
import AllcoinsContext from "./allcoinsContext";
import allcoinsReducer from "./allcoinsReducer";
import { GET_ALLCOINS, ALLCOINS_ERROR } from "../types";

const AllcoinsState = (props) => {
  const initialState = {
    coins: [],
    errors: null,
  };
  const [state, dispatch] = useReducer(allcoinsReducer, initialState);

  // Get top coins from coincapapi
  const getAllCoins = async () => {
    try {
      //Delete token header to avoid CORS error
      if (localStorage.token) {
        delete axios.defaults.headers.common["x-auth-token"];
      }
      const config = {
        method: "get",
        url: "https://api.coincap.io/v2/assets",
      };

      const res = await axios(config);
      // reattach token
      if (localStorage.token) {
        axios.defaults.headers.common["x-auth-token"] = localStorage.token;
      }
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
        errors: state.errors,
        getAllCoins,
      }}
    >
      {props.children}
    </AllcoinsContext.Provider>
  );
};

export default AllcoinsState;
