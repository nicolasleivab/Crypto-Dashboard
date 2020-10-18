import React, { useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AuthContext from '../../context/auth/authContext';
import ModalContext from '../../context/modal/modalContext';
import UsercoinsContext from '../../context/usercoins/usercoinsContext';
import styles from './CoinItem.module.css';

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
  const { setModal, setEdit, setCurrent } = modalContext;
  const { deleteCoin, userCoins } = usercoinsContext;

  const handleDelete = (id) => {
    if (!isAuthenticated) {
      setModal();
    } else if (isAuthenticated) {
      deleteCoin(userCoins._id, id);
    }
  };

  const handleEdit = (id) => {
    if (!isAuthenticated) {
      setModal();
    } else if (isAuthenticated) {
      setCurrent(id);
      setEdit(true);
      setModal();
    }
  };

  return (
    <div className={styles.CoinItem}>
      <header className={styles.coinHeader}>
        <div className={styles.coinTitle}>
          <p className={styles.title}>{name}</p>
          <p className={styles.symbol}> ({symbol})</p>
        </div>
        <div className={styles.actoinsContainer}>
          <EditIcon
            style={{
              marginRight: 7,
              color: '#ccffff',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(id)}
          />
          <DeleteOutlineIcon
            style={{
              marginRight: 10,
              color: '#ccffff',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(id)}
          />
        </div>
      </header>
      <aside className={styles.coinInfo}>
        <div className={styles.flexContainer}>
          <p>Price:</p>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <p>{`$${price}`}</p>
            <p className={change > 0 ? styles.greenChange : styles.redChange}>
              {change > 0 ? `(+${change}%)` : `(${change}%)`}
            </p>
          </div>
        </div>
        <div className={styles.flexContainer}>
          <p>Market Cap:</p>
          <p>{`$${marketCap}`}</p>
        </div>
        <div className={styles.flexContainer}>
          <p>Rank:</p>
          <p>{`#${rank}`}</p>
        </div>
        <div className={styles.flexContainer}>
          <p>Volume:</p>
          <p>{`$${volume}`}</p>
        </div>
        <div className={styles.flexContainer}>
          <p>Supply:</p>
          <p>{supply}</p>
        </div>
      </aside>
    </div>
  );
};

export default CoinItem;
