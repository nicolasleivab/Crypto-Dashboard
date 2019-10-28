/* Sort Coins */

let sorted = [];
let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5= 0;//counters as indicators

function sortPrice() {
    if(counter1 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter1 = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter1 = 0;
    }
};

function sortMarket() {
    if(counter2 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.marketCapUsd - bCoin.marketCapUsd);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter2 = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.marketCapUsd - aCoin.marketCapUsd);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter2 = 0;
    }
};

function sortChange() {
    if(counter3 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.changePercent24Hr - bCoin.changePercent24Hr);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter3 = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.changePercent24Hr - aCoin.changePercent24Hr);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter3 = 0;
    }
};

function sortVolume() {
    if(counter4 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.volumeUsd24Hr - bCoin.volumeUsd24Hr);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter4 = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.volumeUsd24Hr - aCoin.volumeUsd24Hr);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter4 = 0;
    }
};

function sortSupply() {
    if(counter5 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.supply - bCoin.supply);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter5 = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.supply - aCoin.supply);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter5 = 0;
    }
};

document.getElementById('sort1').addEventListener('click', sortMarket);
document.getElementById('sort2').addEventListener('click', sortPrice);
document.getElementById('sort3').addEventListener('click', sortChange);
document.getElementById('sort4').addEventListener('click', sortVolume);
document.getElementById('sort5').addEventListener('click', sortSupply);

