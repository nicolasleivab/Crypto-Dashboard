import React, { Fragment } from 'react';
import CoinItem from '../components/CoinItem/CoinItem';

const CoinsContainer = (props) => {
  const { formattedCoins, filteredCoins, isAuthenticated } = props;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default CoinsContainer;
