import React, { useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";
import styles from "./CoinItem.module.css";

const CoinItem = ({ name, price, change, symbol, volume, id }) => {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const { isAuthenticated } = authtContext;
  const { setModal } = modalContext;

  const handleDelete = () => {
    if (!isAuthenticated) {
      setModal();
    }
  };

  const handleEdit = () => {
    if (!isAuthenticated) {
      setModal();
    }
  };

  return (
    <div className={styles.CoinItem}>
      <div className={styles.coinHeader}>
        <div className={styles.coinTitle}>
          <p className={styles.title}>{name}</p>
          <p className={styles.symbol}> ({symbol})</p>
        </div>
        <div className={styles.actoinsContainer}>
          <EditIcon
            style={{ marginRight: 7, color: "#ccffff", cursor: "pointer" }}
            onClick={() => handleEdit(id)}
          />
          <DeleteOutlineIcon
            style={{ marginRight: 10, color: "#ccffff", cursor: "pointer" }}
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinItem;
