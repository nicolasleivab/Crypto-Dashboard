/* Main js */

//CoinCap API 
request('GET', 'https://api.coincap.io/v2/candles?exchange=binance&interval=m15&baseId=bitcoin&quoteId=tether')
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    const btcData = data.data; //array of objects with 15 minutes candles
    console.log(btcData);
    
    const btcDaily = btcData.slice(41); // 24hr/15min = 96 then 137(fetched data) - 96 = 41

    const btcDailyCloses = btcDaily.map((function(d){return {"price": +d.close, "date": +d.period} ;}));
    //transform existing array to a new one with the data we need (price and date)
    console.log(btcDailyCloses);


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