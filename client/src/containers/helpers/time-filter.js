export const sliceDataByTimeUnit = (arr, sliceValue) => {
  const lineCoins = ['line1', 'line2', 'line3', 'line4'];
  const PAsliced = [];
  arr.forEach((set) => PAsliced.push(set.slice(sliceValue)));
  const PA = [];

  for (let i = 0; i < PAsliced.length; i++) {
    const coinName = lineCoins[i];

    for (let j = 0; j < PAsliced[i].length; j++) {
      if (i === 0) {
        const obj = {};
        obj[coinName] =
          ((PAsliced[0][j].priceUsd - PAsliced[0][0].priceUsd) * 100) /
          PAsliced[0][0].priceUsd;
        obj.date = new Date(PAsliced[0][j].date);
        PA.push(obj);
      } else {
        PA[j][coinName] =
          ((PAsliced[i][j].priceUsd - PAsliced[i][0].priceUsd) * 100) /
          PAsliced[i][0].priceUsd;
      }
    }
  }
  return PA;
};
