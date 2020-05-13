import React, { useReducer } from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { SET_MODAL, HIDE_MODAL, EDIT_MODE, SET_CURRENT } from "../types";

const ModalState = (props) => {
  const initialState = {
    modal: false,
    editmode: false,
    current: null,
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
  // set edit mode
  const setEdit = (bool) => {
    dispatch({ type: EDIT_MODE, payload: bool });
  };
  //set current
  const setCurrent = (coin) => {
    dispatch({ type: SET_CURRENT, payload: coin });
  };
  return (
    <ModalContext.Provider
      value={{
        modal: state.modal,
        editmode: state.editmode,
        current: state.current,
        setModal,
        hideModal,
        setEdit,
        setCurrent,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
