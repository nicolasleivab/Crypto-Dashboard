import {
  GET_USERCOINS,
  USERCOINS_ERROR,
  ADD_USERLIST,
  USERLIST_ERROR,
  DELETE_COIN,
  COIN_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERCOINS:
      return {
        ...state,
        userCoins: action.payload,
      };
    case USERCOINS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case ADD_USERLIST:
      return {
        ...state,
      };
    case USERLIST_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case DELETE_COIN:
      return {
        ...state,
        userCoins: {
          coins: [
            ...state.userCoins.coins.filter(
              (coin) => coin.name !== action.payload
            ),
          ],
        },
      };
    case COIN_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
