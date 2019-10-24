/* Search js */
const topCoins = JSON.parse(localStorage.getItem('arrayToPass'));
const urlParams = new URLSearchParams(window.location.search);//get query parameter
const selectedCoin = urlParams.get('selectedCoin');
let inputCoin;
const request = new XMLHttpRequest();

function appData(id, text){
    document.getElementById(id).innerHTML = text;
}

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
            appData("rank", "Rank #" + filtered[0].rank);
            appData("title", filtered[0].name+" - "+filtered[0].symbol+" "+"("+filtered[0].changePercent24Hr+"%)");
            appData("marketCap", "Market Cap: "+filtered[0].marketCapUsd);
            appData("supply", "Supply: " +filtered[0].supply);
            appData("24hrvolume", "Volume (24hr): "+filtered[0].volumeUsd24Hr);
            appData("price-change", "24hr Price Change: "+filtered[0].changePercent24Hr+"%");
            if(filtered[0].changePercent24Hr<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
            }else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
            }else if(inputCoin == undefined){
            function filterCoin(coin) {return coin.id == "bitcoin";}
            let bitcoin = topCoins.filter(filterCoin);
            appData("rank", "Rank #" + bitcoin[0].rank);
            appData("title", bitcoin[0].name+" - "+bitcoin[0].symbol+" "+"("+bitcoin[0].changePercent24Hr+"%)");
            appData("marketCap", "Market Cap: "+bitcoin[0].marketCapUsd);
            appData("supply", "Supply: " +bitcoin[0].supply);
            appData("24hrvolume", "Volume (24hr): "+bitcoin[0].volumeUsd24Hr);
            appData("price-change", "24hr Price Change: "+bitcoin[0].changePercent24Hr+"%");
            if(bitcoin[0].changePercent24Hr<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
            }else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
            }else{
            function filterCoin(coin) {return coin.id == inputCoin;}
            let filtered = topCoins.filter(filterCoin);
            appData("rank", "Rank #" + filtered[0].rank);
            appData("title", filtered[0].name+" - "+filtered[0].symbol+" "+"("+filtered[0].changePercent24Hr+"%)");
            appData("marketCap", "Market Cap: "+filtered[0].marketCapUsd);
            appData("supply", "Supply: " +filtered[0].supply);
            appData("24hrvolume", "Volume (24hr): "+filtered[0].volumeUsd24Hr);
            appData("price-change", "24hr Price Change: "+filtered[0].changePercent24Hr+"%");
            if(filtered[0].changePercent24Hr<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
            }else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
            }
        }   
    } 
    request.send();
}
//if selected from dashboard
if(selectedCoin != undefined){
getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15");
}
//default chart
else{
getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=m15");
};
//selected from search input
function clicked() {
    inputCoin = document.getElementById('search').value;
    inputCoin = inputCoin.replace(/\s+/g, '-').toLowerCase();
   
//Request input coin candles data
getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15");
};

document.getElementById('searchSubmit').addEventListener('click', clicked);
