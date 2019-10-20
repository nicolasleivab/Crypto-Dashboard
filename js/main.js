/* Main js */

//CoinCap API 
const coin = ["bitcoin", "ethereum", "ripple", "tether", "bitcoin-cash", "litecoin", "binance-coin", "eos", "bitcoin-sv", "stellar"],
    bindsArray = ["lineChart1", "lineChart2", "lineChart3", "lineChart4", "lineChart5", "lineChart6",
"lineChart7", "lineChart8", "lineChart9", "lineChart10"],
    parentsArray = ["#chart1", "#chart2", "#chart3", "#chart4", "#chart5", "#chart6", "#chart7", "#chart8", "#chart9", "#chart10"],
    titlesArray = ["title1", "title2", "title3", "title4", "title5", "title6", "title7", "title8", "title9", "title10"],
    pricesArray = ["price1", "price2", "price3", "price4", "price5", "price6", "price7", "price8", "price9", "price10"],
    changeArray = ["change1", "change2", "change3", "change4", "change5", "change6", "change7", "change8", "change9", "change10"],
    headerArray = ["header1", "header2", "header3", "header4", "header5", "header6", "header7", "header8", "header9", "header10"],
    datesArray = ["date1", "date2", "date3", "date4", "date5", "date6", "date7", "date8", "date9", "date10"],
    request = new XMLHttpRequest();

(function loop(i, length) {
    if (i>= length) {
        return;
    }
    const url = "https://api.coincap.io/v2/assets/"+coin[i]+"/history?interval=m15";

    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) { //so we can get the elements in order
            const data = JSON.parse(request.responseText);
            const cryptoData = data.data; //array of objects with 15 minutes candles
            
            const oneDayData = cryptoData.slice(-96); // 24hr/15min = 96 
            const formattedData= oneDayData.map((function(d){return {"price": (Math.round(d.priceUsd*10000))/10000, "date": new Date(d.time)} ;}));
            //transform existing array to a new one with the data we need (price and date)
            console.log(formattedData);
            
            /* D3 viz */
            //create a new binding with each loop for each coin
            bindsArray[i] = new LineChart(parentsArray[i], formattedData, coin[i], titlesArray[i], pricesArray[i], changeArray[i], headerArray[i], datesArray[i]);

            //calling the  drawChart method for each coin
            bindsArray[i].drawChart();


            loop(i + 1, length);
        }
    }
    request.send();
})(0, coin.length);