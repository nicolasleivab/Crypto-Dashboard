/* Main js */

//CoinCap API 
request('GET', 'https://api.coincap.io/v2/candles?exchange=binance&interval=m15&baseId=bitcoin&quoteId=tether')
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    const btcData = data.data; //array of objects with 15 minutes candles
    console.log(btcData);
    

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