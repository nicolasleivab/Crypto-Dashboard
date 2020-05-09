import { GET_USERCOINS, USERCOINS_ERROR } from "../types";

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
    default:
      return state;
  }
};
