import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/layout/NavBar';
import CoinsContainer from './CoinsContainer';
import AuthForm from '../components/AuthForm/AuthForm';
import CoinForm from '../components/CoinForm/CoinForm';
import Copyright from '../components/Copyright/Copyright';
import AuthContext from '../context/auth/authContext';
import ModalContext from '../context/modal/modalContext';
import AllcoinsContext from '../context/allcoins/allcoinsContext';
import UsercoinsContext from '../context/usercoins/usercoinsContext';
import D3LineChart from '../components/D3LineChart/D3LineChart';
import Legend from '../components/Legend/Legend';
import TimeFilter from '../components/TimeFilter/TimeFilter';
import useWindowSize from '../components/assets/hooks/useWindowSize';
import { formatCoins, sliceDataByTimeUnit } from './helpers';
import styles from './Home.module.css';

function Home() {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const allcoinsContext = useContext(AllcoinsContext);
  const usercoinsContext = useContext(UsercoinsContext);

  const { loadUser, isAuthenticated, addUserList } = authtContext;
  const {
    modal,
    setModal,
    hideModal,
    editmode,
    setAdd,
    setEdit,
  } = modalContext;
  const { getAllCoins, coins } = allcoinsContext;
  const {
    getUserCoins,
    userCoins,
    getPriceAction,
    priceAction,
  } = usercoinsContext;

  const [formattedCoins, setFormattedCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [formattedPA, setFormattedPA] = useState([]);
  const [storedPA, setStored] = useState([]);

  const [chartWidth, setChartWidth] = useState(1100);
  const [chartHeight, setChartHeight] = useState(500);
  const [windowWidth, windowHeight] = useWindowSize();
  const [responsiveTicks, setTicks] = useState(10);

  useEffect(() => {
    if (windowWidth > 1000) {
      setTicks(10);
      setChartWidth(1100);
    } else if (windowWidth > 800) {
      setChartWidth(700);
      setTicks(7);
    } else if (windowWidth > 600) {
      setChartWidth(550);
      setTicks(6);
    } else {
      setChartWidth(400);
      setTicks(5);
    }
  }, [windowWidth]);
  //load user and coins
  useEffect(() => {
    loadUser();
    getAllCoins();
    // eslint-disable-next-line
  }, []);

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
        //get priceaction
        getPriceAction([...coinList]);
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

  const timeFilerHandle = (e) => {
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
      <div className={modal ? styles.blurMode : null}>
        <NavBar />
      </div>
      <CoinsContainer
        filteredCoins={filteredCoins}
        formattedCoins={formattedCoins}
        isAuthenticated={isAuthenticated}
        modal={modal}
        addNewCoin={addNewCoin}
      />
      {formattedPA.length > 0 && (
        <div className={modal ? styles.D3ContainerBlur : styles.D3Container}>
          <Legend coins={filteredCoins} chartWidth={chartWidth} />
          <TimeFilter timeFilter={timeFilerHandle} priceAction={priceAction} />
          <D3LineChart
            data={formattedPA}
            coins={filteredCoins}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            responsiveTicks={responsiveTicks}
          />
        </div>
      )}
      {modal && editmode && <CoinForm />}
      {modal && !editmode && <AuthForm />}
      <div className={modal ? styles.blurMode : null}>
        <Copyright copyright={'Nicolás Leiva Büchi'} />
      </div>
    </div>
  );
}

export default Home;
