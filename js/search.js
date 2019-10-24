/* Search js */
const topCoins = JSON.parse(localStorage.getItem('arrayToPass'));
const urlParams = new URLSearchParams(window.location.search);//get query parameter
const selectedCoin = urlParams.get('selectedCoin');
let inputCoin;
const request = new XMLHttpRequest();

function getData(url){
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
    
            //append coin title and rank to innetHTML
           if(selectedCoin != undefined && inputCoin == undefined){
            //filter this coin
            function filterCoin(coin) {return coin.id == selectedCoin;}
            let filtered = topCoins.filter(filterCoin);
            document.getElementById("rank").innerHTML = "Rank #" + filtered[0].rank;
            document.getElementById("title").innerHTML = filtered[0].name+" - "+filtered[0].symbol;
            }else if(inputCoin == undefined){
            function filterCoin(coin) {return coin.id == "bitcoin";}
            let bitcoin = topCoins.filter(filterCoin);
            document.getElementById("rank").innerHTML = "Rank #" + bitcoin[0].rank;
            document.getElementById("title").innerHTML = bitcoin[0].name+" - "+bitcoin[0].symbol;
            }
        }
       
    } 
    
    request.send();
}

if(selectedCoin != undefined){
//if selected from dashboard
getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15");
}
else{
//default chart
getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=m15");
};
//selected from search input
function clicked() {
    inputCoin = document.getElementById('search').value;
    inputCoin = inputCoin.replace(/\s+/g, '-').toLowerCase();
    console.log(inputCoin);
   
//Request input coin candles data
getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15");
function filterCoin(coin) {return coin.id == inputCoin;}
let filtered = topCoins.filter(filterCoin);
document.getElementById("rank").innerHTML = "Rank #" + filtered[0].rank;
document.getElementById("title").innerHTML = filtered[0].name+" - "+filtered[0].symbol;
};

document.getElementById('searchSubmit').addEventListener('click', clicked);
