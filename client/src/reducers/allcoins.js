import { GET_ALLCOINS, ALLCOINS_ERROR } from 'actions/types';

const initialState = {
  coins: [],
  errors: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLCOINS:
      return {
        ...state,
        coins: action.payload,
      };
    case ALLCOINS_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
