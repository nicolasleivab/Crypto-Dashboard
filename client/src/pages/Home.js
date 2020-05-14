import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import CoinItem from "../components/CoinItem/CoinItem";
import AuthForm from "../components/AuthForm/AuthForm";
import CoinForm from "../components/CoinForm/CoinForm";
import AuthContext from "../context/auth/authContext";
import ModalContext from "../context/modal/modalContext";
import AllcoinsContext from "../context/allcoins/allcoinsContext";
import UsercoinsContext from "../context/usercoins/usercoinsContext";
import D3LineChart from "../components/D3LineChart/D3LineChart";
import styles from "./Home.module.css";

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

  //load user and coins
  useEffect(() => {
    loadUser();
    getAllCoins();
    getPriceAction(["bitcoin", "ethereum", "ripple", "bitcoin-cash"]);
  }, []);

  //format coins
  useEffect(() => {
    if (coins.data) {
      coins.data.forEach((d) => {
        if (d.priceUsd >= 2) {
          d.priceUsd = Math.floor(d.priceUsd * 100) / 100;
        } else {
          d.priceUsd = Math.floor(d.priceUsd * 10000) / 10000;
        }
        d.maxSupply = Math.floor(d.maxSupply * 10000) / 10000;
        d.changePercent24Hr = Math.floor(d.changePercent24Hr * 100) / 100;
        d.vwap24Hr = Math.floor(d.vwap24Hr * 10000) / 10000;
        d.marketCapUsd = +d.marketCapUsd;
        if (d.marketCapUsd >= 1000000000) {
          d.marketCapUsd = (d.marketCapUsd / 1000000000).toFixed(2) + "B";
        } else if (d.marketCapUsd >= 1000000) {
          d.marketCapUsd = (d.marketCapUsd / 1000000).toFixed(2) + "M";
        } else {
          d.marketCapUsd = (d.marketCapUsd / 1000).toFixed(2) + "K";
        }
        d.volumeUsd24Hr = +d.volumeUsd24Hr;
        if (d.volumeUsd24Hr >= 1000000000) {
          d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000000000).toFixed(2) + "B";
        } else if (d.volumeUsd24Hr >= 1000000) {
          d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000000).toFixed(2) + "M";
        } else {
          d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000).toFixed(2) + "K";
        }
        d.supply = +d.supply;
        if (d.supply >= 1000000000) {
          d.supply = (d.supply / 1000000000).toFixed(2) + "B";
        } else if (d.supply >= 1000000) {
          d.supply = (d.supply / 1000000).toFixed(2) + "M";
        } else {
          d.supply = (d.supply / 1000).toFixed(2) + "K";
        }
      });

      setFormattedCoins(coins.data);
      console.log(coins.data);
    }
  }, [coins]);

  //format price action
  useEffect(() => {
    if (priceAction.BTC) {
      const PA = [];

      for (let i = 0; i < priceAction.BTC.length; i++) {
        const obj = {};
        obj.BTC = Number(priceAction.BTC[i].priceUsd);
        obj.BCH = Number(priceAction.BCH[i].priceUsd);
        obj.XRP = Number(priceAction.XRP[i].priceUsd);
        obj.ETH = Number(priceAction.ETH[i].priceUsd);
        obj.date = new Date(priceAction.BTC[i].date);

        PA.push(obj);
      }
      console.log(PA);
      setFormattedPA(PA);
    }
  }, [priceAction]);

  //get user coins
  useEffect(() => {
    if (isAuthenticated && formattedCoins.length > 0) {
      hideModal();
      getUserCoins();
    }
  }, [isAuthenticated, formattedCoins]);

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
      }
      console.log(userCoins);
      setFilteredCoins(filteredCoins);
    } else {
      setFilteredCoins([]);
    }
  }, [userCoins, isAuthenticated]);

  const addNewCoin = () => {
    setModal();
    setEdit(true);
    setAdd(true);
  };

  return (
    <div className={styles.Home}>
      <div className={modal ? styles.blurMode : null}>
        <NavBar />
      </div>
      <div
        className={
          modal
            ? [styles.coinsContainer, styles.blurMode].join(" ")
            : styles.coinsContainer
        }
      >
        {formattedCoins.length > 0 &&
          !isAuthenticated &&
          formattedCoins
            .slice(0, 4)
            .map((coin) => (
              <CoinItem
                key={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.priceUsd}
                volume={coin.volumeUsd24Hr}
                change={coin.changePercent24Hr}
                supply={coin.supply}
                id={coin.id}
                marketCap={coin.marketCapUsd}
                rank={coin.rank}
              />
            ))}
        {filteredCoins.length > 0 &&
          isAuthenticated &&
          filteredCoins.map((coin) => (
            <CoinItem
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.priceUsd}
              volume={coin.volumeUsd24Hr}
              change={coin.changePercent24Hr}
              supply={coin.supply}
              id={coin.id}
              marketCap={coin.marketCapUsd}
              rank={coin.rank}
            />
          ))}
        {isAuthenticated && filteredCoins.length < 4 && (
          <div className={styles.roundBtn} onClick={() => addNewCoin()}>
            +
          </div>
        )}
      </div>
      {formattedPA.length > 0 && (
        <div className="D3container">
          <D3LineChart data={formattedPA} />
        </div>
      )}
      {modal && editmode && <CoinForm />}
      {modal && !editmode && <AuthForm />}
    </div>
  );
}

export default Home;
