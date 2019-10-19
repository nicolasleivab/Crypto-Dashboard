/* Coins js */

//CoinMarketCap API for global metrics
const apiKey = {
    key: "xxxxxxx" //insert private key
};

request('GET', 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=' + apiKey.key)
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    const generalData = data.data.quote.USD;
    console.log(generalData);
    console.log(data.data);

//append global metrics
document.getElementById("marketCap").innerHTML = "Market Cap (USD): " + data.data.quote.USD.total_market_cap;
document.getElementById("totalVol").innerHTML = "Total Volume (24hr): " + data.data.quote.USD.total_volume_24h;
document.getElementById("btcDom").innerHTML = "Bitcoin Dominance (%): " + data.data.btc_dominance;
document.getElementById("allCoins").innerHTML = "Active Cryptocurrencies: " + data.data.active_cryptocurrencies;

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
    console.log(data.data);
    const cryptoData = data.data;

// Format decimals
cryptoData.forEach(function(d) {
    d.priceUsd = Math.round(d.priceUsd * 100) / 100;
    d.changePercent24Hr = Math.round(d.changePercent24Hr * 100) / 100;
    d.marketCapUsd = Math.round(d.marketCapUsd * 100) / 100;
    d.supply = Math.round(d.supply * 100) / 100;
    d.volumeUsd24Hr = Math.round(d.volumeUsd24Hr * 100) / 100;
    });

function displayCryptoBoard(arr) {
    let theExport = ""; //initialize the export
    arr.forEach((crypto) => theExport += '<tr><td>' + crypto.rank + '</td><td>' + crypto.symbol + '</td><td>' + 
    crypto.name + '</td><td>' + crypto.marketCapUsd + '</td><td>' + crypto.priceUsd + '</td><td>' + 
    crypto.changePercent24Hr + '</td><td>' + crypto.volumeUsd24Hr + '</td><td>' + 
    crypto.supply + '</td></tr>'); //prints the row tables with each value
    document.getElementById("crypto-table").innerHTML = theExport;
}

let first20Coins = cryptoData.slice(0, 20);
let secondBatch = cryptoData.slice(20, 40);
let thirdBatch = cryptoData.slice(40, 60);
let fourthBatch = cryptoData.slice(60, 80);
let fifthBatch = cryptoData.slice(80, 100);

displayCryptoBoard(first20Coins); //call table function with the array and append to #crypto-table

/*
Add on click functions for displaying coins 21-40, 41-60, 61-80 and 81-100
*/

document.getElementById("first").onclick = function(){displayCryptoBoard(first20Coins)};
document.getElementById("second").onclick = function(){displayCryptoBoard(secondBatch)};
document.getElementById("third").onclick = function(){displayCryptoBoard(thirdBatch)};
document.getElementById("fourth").onclick = function(){displayCryptoBoard(fourthBatch)};
document.getElementById("fifth").onclick = function(){displayCryptoBoard(fifthBatch)};

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
