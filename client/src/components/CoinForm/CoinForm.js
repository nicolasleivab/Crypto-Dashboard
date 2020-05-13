import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";
import UsercoinsContext from "../../context/usercoins/usercoinsContext";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./CoinForm.module.css";
import UsercoinsState from "../../context/usercoins/UsercoinsState";
import { ADD_COIN } from "../../context/types";

const CoinForm = (props) => {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const usercoinsContext = useContext(UsercoinsContext);

  const {
    loginUser,
    registerUser,
    error,
    clearErrors,
    isAuthenticated,
  } = authtContext;
  const {
    hideModal,
    setModal,
    modal,
    setEdit,
    current,
    addmode,
    setAdd,
  } = modalContext;
  const { editCoin, userCoins, addCoin } = usercoinsContext;

  const [coin, setCoin] = useState({
    name: "",
    symbol: "",
  });

  const { name, symbol } = coin;

  const onChange = (e) => setCoin({ ...coin, [e.target.name]: e.target.value });

  const onSubmit = () => {
    if (addmode) {
      setAdd(false);
      addCoin(userCoins._id, coin);
    } else {
      editCoin(userCoins._id, current, coin);
    }
    hideModal();
    setEdit(false);
  };

  const closeForm = () => {
    hideModal();
    setEdit(false);
  };

  return (
    <div className={styles.CoinForm}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginTop: 0,
        }}
      >
        <CloseIcon className={styles.closeIcon} onClick={() => closeForm()} />
        <p className={styles.title}>{addmode ? "Add New Coin" : "Edit Coin"}</p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          onSubmit={onSubmit}
        >
          <input
            type="name"
            placeholder="Search by name"
            name="name"
            value={name}
            required="required"
            onChange={onChange}
            maxLength={35}
            style={{ paddingLeft: 15 }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className={styles.btnGray}
              type="submit"
              value={addmode ? "Add Coin" : "Update Coin"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoinForm;
