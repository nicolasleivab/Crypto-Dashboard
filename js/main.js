/* Main js */

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
let first20Coins = cryptoData.slice(1,20);
displayCryptoBoard(first20Coins); //call table function with the array and append to #crypto-table

/*
Add on click functions for displaying coins 21-40, 41-60, 61-80 and 81-100
*/
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