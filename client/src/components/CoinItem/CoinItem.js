import React, { useContext, useState, Fragment } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";
import UsercoinsContext from "../../context/usercoins/usercoinsContext";
import styles from "./CoinItem.module.css";

const CoinItem = ({
  name,
  price,
  change,
  symbol,
  volume,
  id,
  marketCap,
  rank,
  supply,
}) => {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const usercoinsContext = useContext(UsercoinsContext);

  const { isAuthenticated } = authtContext;
  const { setModal } = modalContext;
  const { deleteCoin, userCoins } = usercoinsContext;

  const [editMode, setEditMode] = useState(false);

  const handleDelete = (id) => {
    if (!isAuthenticated) {
      setModal();
    } else if (isAuthenticated) {
      deleteCoin(userCoins._id, id);
    }
  };

  const handleEdit = () => {
    if (!isAuthenticated) {
      setModal();
    } else if (isAuthenticated) {
      setEditMode(true);
    }
  };

  return (
    <div className={styles.CoinItem}>
      <header className={styles.coinHeader}>
        {editMode ? (
          <Fragment>
            <div className={styles.coinTitle}>
              <input />
              <div className={styles.btnMain}>SAVE</div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.coinTitle}>
              <p className={styles.title}>{name}</p>
              <p className={styles.symbol}> ({symbol})</p>
            </div>
            <div className={styles.actoinsContainer}>
              <EditIcon
                style={{
                  marginRight: 7,
                  color: "#ccffff",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(id)}
              />
              <DeleteOutlineIcon
                style={{
                  marginRight: 10,
                  color: "#ccffff",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(id)}
              />
            </div>
          </Fragment>
        )}
      </header>
      <aside className={styles.coinInfo}>
        <div className={styles.priceContainer}>
          <p>Price: ${price}</p>
          <p className={change > 0 ? styles.greenChange : styles.redChange}>
            {change > 0 ? "(" + "+" + change + "%)" : "(" + change + "%)"}
          </p>
        </div>
        <p>Market Cap: ${marketCap}</p>
        <p>Rank: #{rank}</p>
        <p>Volume: {volume}</p>
        <p>Supply: {supply}</p>
      </aside>
    </div>
  );
};

export default CoinItem;
