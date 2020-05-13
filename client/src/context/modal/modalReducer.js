import {
  SET_MODAL,
  HIDE_MODAL,
  EDIT_MODE,
  ADD_MODE,
  SET_CURRENT,
} from "../types";
import { TransitionGroup } from "react-transition-group";

export default (state, action) => {
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
