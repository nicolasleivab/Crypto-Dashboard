import { SET_MODAL, HIDE_MODAL } from "../types";
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

    default:
      return state;
  }
};
