import React, { Fragment } from 'react';
import CoinItem from '../components/CoinItem/CoinItem';
import styles from './Home.module.css';

const CoinsContainer = (props) => {
  const {
    formattedCoins,
    filteredCoins,
    isAuthenticated,
    modal,
    addNewCoin,
  } = props;

  return (
    <div
      className={
        modal
          ? [styles.coinsContainer, styles.blurMode].join(' ')
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
  );
};

export default CoinsContainer;
