import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import CoinItem from "../components/CoinItem/CoinItem";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthContext from "../context/auth/authContext";
import ModalContext from "../context/modal/modalContext";
import styles from "./Home.module.css";

function Home() {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const { loadUser } = authtContext;
  const { modal } = modalContext;

  useEffect(() => {
    loadUser();
  }, []);

  const [coins, setCoins] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      id: "bitcoin",
      price: "8245",
      price24Hr: "2.6",
      volumeUsd: "675987345653",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      id: "ethereum",
      price: "245",
      price24Hr: "2.6",
      volumeUsd: "675987345653",
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      id: "bitcoin-cash",
      price: "545",
      price24Hr: "2.6",
      volumeUsd: "675987345653",
    },
    {
      name: "Ripple",
      symbol: "XRP",
      id: "ripple",
      price: "0.17",
      price24Hr: "2.6",
      volumeUsd: "675987345653",
    },
  ]);

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
        {coins.map((coin) => (
          <CoinItem
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.price}
            volume={coin.volumeUsd}
            change={coin.price24Hr}
            id={coin.id}
          />
        ))}
      </div>
      {modal && <AuthForm />}
    </div>
  );
}

export default Home;
