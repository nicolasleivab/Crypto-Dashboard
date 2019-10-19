/* Main js */

//CoinCap API 
const coin = ["bitcoin", "ethereum", "ripple", "tether", "bitcoin-cash", "litecoin"],
    bindsArray = ["lineChart1", "lineChart2", "lineChart3", "lineChart4", "lineChart5", "lineChart6"],
    parentsArray = ["#chart1", "#chart2", "#chart3", "#chart4", "#chart5", "#chart6"],
    titlesArray = ["title1", "title2", "title3", "title4", "title5", "title6"],
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
            bindsArray[i] = new LineChart(parentsArray[i], formattedData, coin[i], titlesArray[i]);

            //calling the  drawChart method for each coin
            bindsArray[i].drawChart();


            loop(i + 1, length);
        }
    }
    request.send();
})(0, coin.length);