import { GET_ALLCOINS, ALLCOINS_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALLCOINS:
      return {
        ...state,
        coins: action.payload,
      };
    case ALLCOINS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
