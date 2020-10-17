export const formatCoins = (arr) => {
  arr.forEach((d) => {
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
      d.marketCapUsd = (d.marketCapUsd / 1000000000).toFixed(2) + 'B';
    } else if (d.marketCapUsd >= 1000000) {
      d.marketCapUsd = (d.marketCapUsd / 1000000).toFixed(2) + 'M';
    } else {
      d.marketCapUsd = (d.marketCapUsd / 1000).toFixed(2) + 'K';
    }
    d.volumeUsd24Hr = +d.volumeUsd24Hr;
    if (d.volumeUsd24Hr >= 1000000000) {
      d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000000000).toFixed(2) + 'B';
    } else if (d.volumeUsd24Hr >= 1000000) {
      d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000000).toFixed(2) + 'M';
    } else {
      d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000).toFixed(2) + 'K';
    }
    d.supply = +d.supply;
    if (d.supply >= 1000000000) {
      d.supply = (d.supply / 1000000000).toFixed(2) + 'B';
    } else if (d.supply >= 1000000) {
      d.supply = (d.supply / 1000000).toFixed(2) + 'M';
    } else {
      d.supply = (d.supply / 1000).toFixed(2) + 'K';
    }
  });

  return arr;
};
