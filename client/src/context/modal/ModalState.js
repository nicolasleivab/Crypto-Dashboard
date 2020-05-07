import React, { useReducer } from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { SET_MODAL, HIDE_MODAL } from "../types";

const ModalState = (props) => {
  const initialState = {
    modal: false,
  };
  const [state, dispatch] = useReducer(modalReducer, initialState);

  // Set Modal
  const setModal = () => {
    dispatch({ type: SET_MODAL });
  };
  // Hide Modal
  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  return (
    <ModalContext.Provider
      value={{
        modal: state.modal,
        setModal,
        hideModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
