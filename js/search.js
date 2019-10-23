/* Search js */
let topCoins = JSON.parse(localStorage.getItem('arrayToPass'));

function clicked() {
    let inputCoin = document.getElementById('search').value;
    inputCoin = inputCoin.replace(/\s+/g, '-').toLowerCase();
    console.log(inputCoin);
   
//Request input coin candles data
let url = "https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15";

let request = new XMLHttpRequest();
request.open("GET", url);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        let data = JSON.parse(request.responseText);
        const cryptoData = data.data;
        const oneDayData = cryptoData.slice(-96); // 24hr/15min = 96 (start with 1 day chart by default) 
        const formattedData= oneDayData.map((function(d){return {"price": (Math.round(d.priceUsd*10000))/10000, "date": new Date(d.time)} ;}));
        console.log(formattedData);
        //call update func to render the chart with new data
        updateChart(formattedData);
        
    }
   
}
request.send();
}


document.getElementById('searchSubmit').addEventListener('click', clicked);
