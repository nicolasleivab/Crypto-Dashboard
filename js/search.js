/* Search js */
const topCoins = JSON.parse(localStorage.getItem('arrayToPass'));
const urlParams = new URLSearchParams(window.location.search);//get query parameter
const selectedCoin = urlParams.get('selectedCoin');
const request = new XMLHttpRequest();

if(selectedCoin != undefined){
//if selected from dashboard
let url = "https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15";
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

        //append coin text to innetHTML
        document.getElementById("title").innerHTML = selectedCoin;
        //filter this coin
        function filterCoin(coin) {
            return coin.id == selectedCoin;
        }
        
        let filtered = topCoins.filter(filterCoin);
        //append coin rank to innetHTML
         document.getElementById("rank").innerHTML = "Rank #" + filtered[0].rank;
        
    } 
}
request.send();
}
//default chart
else{
//Request input coin candles data
let url = "https://api.coincap.io/v2/assets/bitcoin/history?interval=m15";
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

        //append coin text to innetHTML
        document.getElementById("title").innerHTML = "bitcoin";

        function filterCoin(coin) {
            return coin.id == "bitcoin";
        }
        
        let filtered = topCoins.filter(filterCoin);

        //append coin rank to innetHTML
        document.getElementById("rank").innerHTML = "Rank #" + filtered[0].rank;
        
    } 
}
request.send();

}
//selected from search input
function clicked() {
    let inputCoin = document.getElementById('search').value;
    inputCoin = inputCoin.replace(/\s+/g, '-').toLowerCase();
    console.log(inputCoin);
   
//Request input coin candles data
let url = "https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15";

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
        
        //append coin text to innetHTML
        document.getElementById("title").innerHTML = inputCoin;
        //filter this coin
        function filterCoin(coin) {
            return coin.id == inputCoin;
        }
        
        let filtered = topCoins.filter(filterCoin);
         //append coin rank to innetHTML
         document.getElementById("rank").innerHTML = "Rank #" + filtered[0].rank;
        
    }
   
}
request.send();
}


document.getElementById('searchSubmit').addEventListener('click', clicked);
