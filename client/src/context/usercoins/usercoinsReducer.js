import {
  GET_USERCOINS,
  USERCOINS_ERROR,
  DELETE_COIN,
  COIN_ERROR,
  ADD_COIN,
  EDIT_COIN,
  GET_PRICEACTION,
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
    case ADD_COIN:
      return {
        ...state,
        userCoins: {
          coins: [action.payload, ...state.userCoins.coins],
          _id: state.userCoins._id,
        },
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
          _id: state.userCoins._id,
        },
      };
    case EDIT_COIN:
      return {
        ...state,
        userCoins: {
          coins: [
            ...state.userCoins.coins.map((coin) =>
              coin.name === action.payload.current ? action.payload.new : coin
            ),
          ],
          _id: state.userCoins._id,
        },
      };
    case GET_PRICEACTION:
      return {
        ...state,
        priceAction: {
          BTC: action.payload[0],
          BCH: action.payload[1],
          ETH: action.payload[2],
          XRP: action.payload[3],
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
