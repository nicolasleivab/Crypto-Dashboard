/* Coins js */
let topCoins, first20Coins, secondBatch, thirdBatch, fourthBatch, fifthBatch;
//to be replaced in sort_table.js
let sorted = [];
let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5= 0, firstSort = 0;//counters as indicators
//counter used in this file
let coinCounter = 1;

/*CoinMarketCap API for global metrics*/
const apiKey = {
    key: "xxxxxxx" //insert private key
};

//table draw func
function displayCryptoBoard(arr) {
    let theExport = ""; //initialize the export
    arr.forEach((crypto) => theExport += '<tr><td>' + crypto.rank + '</td><td>' + "<a href=chart.html?selectedCoin=" + crypto.id+">"+crypto.symbol+"</a>" + '</td><td>' + 
    "<a href=chart.html?selectedCoin=" + crypto.id+">"+crypto.name+"</a>" + '</td><td>' + "$"+(crypto.marketCapUsd).toLocaleString('en') + '</td><td>' + "$"+(crypto.priceUsd).toLocaleString('en')+ '</td><td>' + 
    crypto.changePercent24Hr + '</td><td>' + "$"+(crypto.volumeUsd24Hr).toLocaleString('en') + '</td><td>' + 
    (crypto.supply).toLocaleString('en') + '</td></tr>'); //prints the row tables with each value
    document.getElementById("crypto-table").innerHTML = theExport;
}

request('GET', 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apiKey.key)
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    const generalData = data.data.quote.USD;
    console.log(generalData);
    console.log(data.data);

//append global metrics
document.getElementById("marketCap").innerHTML = "Market Cap (USD): " + Number(data.data.quote.USD.total_market_cap).toLocaleString('en');
document.getElementById("totalVol").innerHTML = "Total Volume (24hr): " + Number(data.data.quote.USD.total_volume_24h).toLocaleString('en');
document.getElementById("btcDom").innerHTML = "Bitcoin Dominance (%): " + Number(data.data.btc_dominance).toLocaleString('en');
document.getElementById("allCoins").innerHTML = "Active Cryptocurrencies: " + Number(data.data.active_cryptocurrencies).toLocaleString('en');

}).catch()

function request(method, url) {
    return new Promise(function (resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });
    
}

//CoinCap API for top 100 coins
request('GET', 'https://api.coincap.io/v2/assets/')
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    const cryptoData = data.data;

// Format decimals
cryptoData.forEach(function(d) {
    d.priceUsd = Number(Math.round(d.priceUsd * 10000) / 10000);
    d.changePercent24Hr = Number(Math.round(d.changePercent24Hr * 100) / 100);
    d.marketCapUsd = Number(Math.round(d.marketCapUsd * 100) / 100);
    d.supply = Number(Math.round(d.supply * 100) / 100);
    d.volumeUsd24Hr = Number(Math.round(d.volumeUsd24Hr * 100) / 100);
    });
console.log(cryptoData);

topCoins = cryptoData;

first20Coins = cryptoData.slice(0, 20);
secondBatch = cryptoData.slice(20, 40);
thirdBatch = cryptoData.slice(40, 60);
fourthBatch = cryptoData.slice(60, 80);
fifthBatch = cryptoData.slice(80, 100);

displayCryptoBoard(first20Coins); //call table function with the array and append to #crypto-table

}).catch()

function request(method, url) {
    return new Promise(function (resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });
    
}

/*
Add on click functions for displaying coins 21-40, 41-60, 61-80 and 81-100
*/
function appCoins1(){
    if(firstSort < 1){
        displayCryptoBoard(first20Coins);
        coinCounter = 1; //counter for table page
    }else{
        displayCryptoBoard(sorted.slice(0, 20));
        coinCounter = 1;
    }
};
function appCoins2(){
    if(firstSort < 1){
        displayCryptoBoard(secondBatch);
        coinCounter = 2;
    }else{
        displayCryptoBoard(sorted.slice(20, 40));
        coinCounter = 2;
    }
};
function appCoins3(){
    if(firstSort < 1){
        displayCryptoBoard(thirdBatch);
        coinCounter = 3;
    }else{
        displayCryptoBoard(sorted.slice(40, 60));
        coinCounter = 3;
    }
};
function appCoins4(){
    if(firstSort < 1){
        displayCryptoBoard(fourthBatch);
        coinCounter = 4;
    }else{
        displayCryptoBoard(sorted.slice(60, 80));
        coinCounter = 4;
    }
};
function appCoins5(){
    if(firstSort < 1){
        displayCryptoBoard(fifthBatch);
        coinCounter = 5;
    }else{
        displayCryptoBoard(sorted.slice(80, 100));
        coinCounter = 5;
    }
};

document.getElementById("first").addEventListener('click', appCoins1);
document.getElementById("second").addEventListener('click', appCoins2);
document.getElementById("third").addEventListener('click', appCoins3); 
document.getElementById("fourth").addEventListener('click', appCoins4); 
document.getElementById("fifth").addEventListener('click', appCoins5); 