/* Sort Coins */

function sortPrice() {
    if(counter1 < 1 && coinCounter == 1){
        sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
        displayCryptoBoard(sorted.slice(0, 20));
        counter1 = 1;
        firstSort = 1; //init counter
    }else if(counter1 < 1 && coinCounter == 2){
        sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
        displayCryptoBoard(sorted.slice(20, 40))
        counter1 = 1;
        firstSort = 1;
    }else if(counter1 < 1 && coinCounter == 3){
        sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
        displayCryptoBoard(sorted.slice(40, 60))
        counter1 = 1;
        firstSort = 1;
    }else if(counter1 < 1 && coinCounter == 4){
        sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
        displayCryptoBoard(sorted.slice(60, 80))
        counter1 = 1;
        firstSort = 1;
    }else if(counter1 < 1 && coinCounter == 5){
        sorted = topCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
        displayCryptoBoard(sorted.slice(80, 100))
        counter1 = 1;
        firstSort = 1;
    }else if(counter1 > 0 && coinCounter == 1){
        sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
        displayCryptoBoard(sorted.slice(0, 20))
        counter1 = 0;
        firstSort = 1;
    }else if(counter1 > 0 && coinCounter == 2){
        sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
        displayCryptoBoard(sorted.slice(20, 40))
        counter1 = 0;
        firstSort = 1;
    }else if(counter1 > 0 && coinCounter == 3){
        sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
        displayCryptoBoard(sorted.slice(40, 60))
        counter1 = 0;
        firstSort = 1;
    }else if(counter1 > 0 && coinCounter == 4){
        sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
        displayCryptoBoard(sorted.slice(60, 80))
        counter1 = 0;
        firstSort = 1;
    }else if(counter1 > 0 && coinCounter == 5){
        sorted = topCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd);
        displayCryptoBoard(sorted.slice(80, 100))
        counter1 = 0;
        firstSort = 1;
    }
};

function sortMarket() {
    if(counter2 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.marketCapUsd - bCoin.marketCapUsd);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter2 = 1;
    firstSort = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.marketCapUsd - aCoin.marketCapUsd);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter2 = 0;
    firstSort = 1;
    }
};

function sortChange() {
    if(counter3 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.changePercent24Hr - bCoin.changePercent24Hr);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter3 = 1;
    firstSort = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.changePercent24Hr - aCoin.changePercent24Hr);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter3 = 0;
    firstSort = 1;
    }
};

function sortVolume() {
    if(counter4 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.volumeUsd24Hr - bCoin.volumeUsd24Hr);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter4 = 1;
    firstSort = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.volumeUsd24Hr - aCoin.volumeUsd24Hr);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter4 = 0;
    firstSort = 1;
    }
};

function sortSupply() {
    if(counter5 < 1){
    sorted = topCoins.sort((aCoin, bCoin) => aCoin.supply - bCoin.supply);
    displayCryptoBoard(topCoins.slice(0, 20));
    counter5 = 1;
    firstSort = 1;
    }else{
    sorted = topCoins.sort((aCoin, bCoin) => bCoin.supply - aCoin.supply);
    displayCryptoBoard(topCoins.slice(0, 20))
    counter5 = 0;
    firstSort = 1;
    }
};

document.getElementById('sort1').addEventListener('click', sortMarket);
document.getElementById('sort2').addEventListener('click', sortPrice);
document.getElementById('sort3').addEventListener('click', sortChange);
document.getElementById('sort4').addEventListener('click', sortVolume);
document.getElementById('sort5').addEventListener('click', sortSupply);

