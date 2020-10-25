import React, { useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';
import CoinsContainer from './CoinsContainer';
import ChartContainer from './ChartContainer';
import AuthForm from '../components/AuthForm/AuthForm';
import CoinForm from '../components/CoinForm/CoinForm';
import Copyright from '../components/Copyright/Copyright';
import { formatCoins, sliceDataByTimeUnit } from './helpers';
import { connect } from 'react-redux';
import { loadUser, addUserList } from 'actions/auth';
import { setModal, hideModal, setEdit, setAdd } from 'actions/modal';
import { getAllCoins } from 'actions/allcoins';
import { getUserCoins, getPriceAction } from 'actions/usercoins';
import styles from './Home.module.css';

function Home(props) {
  const {
    loadUser,
    isAuthenticated,
    addUserList,
    modal,
    setModal,
    hideModal,
    editmode,
    setAdd,
    setEdit,
    getAllCoins,
    coins,
    getUserCoins,
    userCoins,
    getPriceAction,
    priceAction,
  } = props;

  const [formattedCoins, setFormattedCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [formattedPA, setFormattedPA] = useState([]);
  const [storedPA, setStored] = useState([]);

  //load user and coins
  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      getAllCoins();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  //format coins
  useEffect(() => {
    if (coins.data) {
      const formattedCoins = formatCoins(coins.data);
      setFormattedCoins(formattedCoins);
    }
  }, [coins]);

  //get user coins
  useEffect(() => {
    if (isAuthenticated && formattedCoins.length > 0) {
      hideModal();
      getUserCoins();
    }
    setFormattedPA([]);
    // eslint-disable-next-line
  }, [isAuthenticated, formattedCoins]);

  //check for user's list
  useEffect(() => {
    if (!userCoins) {
      setFormattedPA([]);
      addUserList();
      window.location.reload();
    }
    // eslint-disable-next-line
  }, [userCoins]);

  //filter user coins
  useEffect(() => {
    setFilteredCoins([]);
    if (isAuthenticated && userCoins) {
      const filteredCoins = [];
      if (userCoins.coins) {
        userCoins.coins.map((userCoin) =>
          formattedCoins.map((coin) =>
            coin.id === userCoin.name ? filteredCoins.push(coin) : null
          )
        );
        const coinList = [];
        userCoins.coins.map((coin) => coinList.push(coin.name));

        getPriceAction(userCoins._id, [...coinList]);
      }

      setFilteredCoins(filteredCoins);
    } else {
      setFilteredCoins([]);
    }
    // eslint-disable-next-line
  }, [userCoins, isAuthenticated]);

  //format price action
  useEffect(() => {
    if (priceAction.length > 0) {
      const PA = sliceDataByTimeUnit(priceAction, -365);
      setFormattedPA(PA);
      setStored(PA);
    }
  }, [priceAction]);

  const addNewCoin = () => {
    setModal();
    setEdit(true);
    setAdd(true);
  };

  const timeFilterHandle = (e) => {
    //1 year
    if (e.target.id === '0') {
      const stored = [...storedPA];
      setFormattedPA(stored);
    }
    //6 months
    if (e.target.id === '1' && priceAction.length > 0) {
      const PA = sliceDataByTimeUnit(priceAction, -180);
      setFormattedPA(PA);
    }
    //3 months
    if (e.target.id === '2' && priceAction.length > 0) {
      const PA = sliceDataByTimeUnit(priceAction, -90);
      setFormattedPA(PA);
    }
    //1 month
    if (e.target.id === '3' && priceAction.length > 0) {
      const PA = sliceDataByTimeUnit(priceAction, -30);
      setFormattedPA(PA);
    }
  };

  return (
    <div className={styles.Home}>
      <NavBar />
      <CoinsContainer
        filteredCoins={filteredCoins}
        formattedCoins={formattedCoins}
        isAuthenticated={isAuthenticated}
        modal={modal}
        addNewCoin={addNewCoin}
      />
      {formattedPA.length > 0 && (
        <ChartContainer
          modal={modal}
          filteredCoins={filteredCoins}
          timeFilterHandle={timeFilterHandle}
          priceAction={priceAction}
          formattedPA={formattedPA}
        />
      )}
      {modal && editmode && <CoinForm />}
      {modal && !editmode && <AuthForm />}
      <Copyright
        copyright={'Nicolás Leiva Büchi'}
        blurMode={styles.blurMode}
        modal={modal}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  modal: state.modal.modal,
  editmode: state.modal.editmode,
  coins: state.allcoins.coins,
  userCoins: state.usercoins.userCoins,
  priceAction: state.usercoins.priceAction,
});

export default connect(mapStateToProps, {
  loadUser,
  addUserList,
  setModal,
  hideModal,
  setAdd,
  setEdit,
  getAllCoins,
  getUserCoins,
  getPriceAction,
})(Home);
