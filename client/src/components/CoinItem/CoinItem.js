import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux';
import { setModal, setEdit, setCurrent } from 'actions/modal';
import { deleteCoin } from 'actions/usercoins';
import styles from './CoinItem.module.css';

const CoinItem = (props) => {
  const {
    name,
    price,
    change,
    symbol,
    volume,
    id,
    marketCap,
    rank,
    supply,
    isAuthenticated,
    setModal,
    setEdit,
    setCurrent,
    modal,
    deleteCoin,
    userCoins,
  } = props;

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

  const tabIndexProp = modal ? {} : { tabIndex: 1 };

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
            onKeyPress={(e) => (e.key === 'Enter' ? handleEdit(e) : null)}
            {...tabIndexProp}
          />
          <DeleteOutlineIcon
            style={{
              marginRight: 10,
              color: '#ccffff',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(id)}
            onKeyPress={(e) => (e.key === 'Enter' ? handleDelete(id) : null)}
            {...tabIndexProp}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  modal: state.modal.modal,
  userCoins: state.usercoins.userCoins,
});

export default connect(mapStateToProps, {
  setModal,
  setEdit,
  setCurrent,
  deleteCoin,
})(CoinItem);
