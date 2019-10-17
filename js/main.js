/* Main js */

//CoinCap API 
request('GET', 'https://api.coincap.io/v2/candles?exchange=binance&interval=m15&baseId=bitcoin&quoteId=tether')
.then((response) => {
    const data = JSON.parse(response.target.responseText);
    const btcData = data.data; //array of objects with 15 minutes candles
    console.log(btcData);
    
    const btcDaily = btcData.slice(41); // 24hr/15min = 96 then 137(fetched data) - 96 = 41

    const btcDailyCloses = btcDaily.map((function(d){return {"price": +d.close, "date": new Date(d.period)} ;}));
    //transform existing array to a new one with the data we need (price and date)
    console.log(btcDailyCloses);


/* D3 viz */
let lineChart1 = new LineChart("#chart1", btcDailyCloses, "bitcoin");
let lineChart2 = new LineChart("#chart2", btcDailyCloses, "bitcoin");
let lineChart3 = new LineChart("#chart3", btcDailyCloses, "bitcoin");
let lineChart4 = new LineChart("#chart4", btcDailyCloses, "bitcoin");
let lineChart5 = new LineChart("#chart5", btcDailyCloses, "bitcoin");
let lineChart6 = new LineChart("#chart6", btcDailyCloses, "bitcoin");

//calling the  drawChart method for each chart
lineChart1.drawChart();
lineChart2.drawChart();
lineChart3.drawChart();
lineChart4.drawChart();
lineChart5.drawChart();
lineChart6.drawChart();

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