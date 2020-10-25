import {
  SET_MODAL,
  HIDE_MODAL,
  EDIT_MODE,
  ADD_MODE,
  SET_CURRENT,
} from 'actions/types';

const initialState = {
  modal: false,
  editmode: false,
  addmode: false,
  current: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: false,
      };
    case EDIT_MODE:
      return {
        ...state,
        editmode: action.payload,
      };
    case ADD_MODE:
      return {
        ...state,
        addmode: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
};
