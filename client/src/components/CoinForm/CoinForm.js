import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '../AutoComplete/AutoComplete';
import { connect } from 'react-redux';
import { hideModal, setEdit, setAdd } from 'actions/modal';
import { editCoin, addCoin } from 'actions/usercoins';
import styles from './CoinForm.module.css';

const CoinForm = (props) => {
  const {
    hideModal,
    setEdit,
    current,
    addmode,
    setAdd,
    editCoin,
    userCoins,
    addCoin,
    coins,
  } = props;

  const [value, setValue] = useState('');

  const onSubmit = () => {
    const coin = {};
    coin.name = value;
    const checkCoin = coins.data.find((coin) => coin.id === value);
    if (checkCoin) {
      if (addmode) {
        addCoin(userCoins._id, coin);
        setAdd(false);
      } else {
        editCoin(userCoins._id, current, coin);
      }
    } else {
      alert('Please enter a valid coin');
    }
    hideModal();
    setEdit(false);
  };

  const closeForm = () => {
    hideModal();
    setEdit(false);
    if (addmode) {
      setAdd(false);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.CoinForm}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: 0,
          }}
        >
          <CloseIcon
            className={styles.closeIcon}
            onClick={() => closeForm()}
            onKeyPress={(e) => (e.key === 'Enter' ? closeForm() : null)}
            tabIndex={0}
          />
          <p className={styles.title}>
            {addmode ? 'Add New Coin' : 'Edit Coin'}
          </p>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
            onSubmit={onSubmit}
          >
            {coins.data.length > 0 && (
              <Autocomplete
                options={coins.data}
                onChange={(value) => setValue(value)}
                onSelect={(value) => setValue(value)}
              />
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <input
                className={styles.btnGray}
                type='submit'
                value={addmode ? 'Add Coin' : 'Update Coin'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  current: state.modal.current,
  addmode: state.modal.addmode,
  userCoins: state.usercoins.userCoins,
  coins: state.allcoins.coins,
});

export default connect(mapStateToProps, {
  hideModal,
  setEdit,
  setAdd,
  editCoin,
  addCoin,
})(CoinForm);
