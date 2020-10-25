import axios from 'axios';
import { GET_ALLCOINS, ALLCOINS_ERROR } from './types';

// Get top coins from coincapapi
export const getAllCoins = (dispatch) => async () => {
  try {
    //Delete token header to avoid CORS error
    if (localStorage.token) {
      delete axios.defaults.headers.common['x-auth-token'];
    }
    const config = {
      method: 'get',
      url: 'https://api.coincap.io/v2/assets',
    };

    const res = await axios(config);
    // reattach token
    if (localStorage.token) {
      axios.defaults.headers.common['x-auth-token'] = localStorage.token;
    }
    dispatch({
      type: GET_ALLCOINS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: ALLCOINS_ERROR });
  }
};
