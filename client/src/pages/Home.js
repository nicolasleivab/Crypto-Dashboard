import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import CoinItem from "../components/CoinItem/CoinItem";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthContext from "../context/auth/authContext";
import ModalContext from "../context/modal/modalContext";
import AllcoinsContext from "../context/allcoins/allcoinsContext";
import UsercoinsContext from "../context/usercoins/usercoinsContext";
import styles from "./Home.module.css";

function Home() {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const allcoinsContext = useContext(AllcoinsContext);
  const usercoinsContext = useContext(UsercoinsContext);

  const { loadUser, isAuthenticated } = authtContext;
  const { modal, hideModal } = modalContext;
  const { getAllCoins, coins } = allcoinsContext;
  const { getUserCoins, userCoins, addUserList } = usercoinsContext;

  const [formattedCoins, setFormattedCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  //load user and coins
  useEffect(() => {
    loadUser();
    getAllCoins();
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

  //modal
  useEffect(() => {
    if (isAuthenticated && formattedCoins.length > 0) {
      hideModal();
      getUserCoins();
      if (!userCoins.user) {
        //addUserList();
      }
    }
  }, [isAuthenticated, formattedCoins]);

  //filter user coins
  useEffect(() => {
    if (isAuthenticated && userCoins.coins) {
      const filteredCoins = [];
      userCoins.coins.map((userCoin) =>
        formattedCoins.map((coin) =>
          coin.id === userCoin.name ? filteredCoins.push(coin) : null
        )
      );
      console.log(userCoins);
      setFilteredCoins(filteredCoins);
    }
  }, [userCoins.coins, isAuthenticated]);

  return (
    <div className={styles.Home}>
      <div className={modal && styles.blurMode}>
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
        {isAuthenticated && <div className={styles.roundBtn}>+</div>}
      </div>
      {modal && <AuthForm />}
    </div>
  );
}

export default Home;
