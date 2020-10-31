import {
  GET_USERCOINS,
  REMOVE_USERCOINS,
  USERCOINS_ERROR,
  DELETE_COIN,
  COIN_ERROR,
  ADD_COIN,
  EDIT_COIN,
  GET_PRICEACTION,
} from 'actions/types';

const initialState = {
  userCoins: {},
  errors: null,
  priceAction: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERCOINS:
      return {
        ...state,
        userCoins: action.payload,
      };
    case REMOVE_USERCOINS:
      return {
        ...state,
        userCoins: {},
        priceAction: [],
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
        priceAction: [...action.payload],
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
