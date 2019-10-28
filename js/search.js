/* Search js */
const topCoins = JSON.parse(localStorage.getItem('arrayToPass'));
const urlParams = new URLSearchParams(window.location.search);//get query parameter
const selectedCoin = urlParams.get('selectedCoin');
let inputCoin, priceChange;
const request = new XMLHttpRequest();
//append coin data functions
function appData(id, text){
    document.getElementById(id).innerHTML = text;
}
function appAll(filtered){
appData("rank", "Rank #" + filtered[0].rank);
appData("title", filtered[0].name+" - "+filtered[0].symbol+" "+"("+filtered[0].changePercent24Hr+"%)");
appData("marketCap", "Market Cap: "+filtered[0].marketCapUsd);
appData("supply", "Supply: " +filtered[0].supply);
appData("max-supply", "Max Supply: " +filtered[0].maxSupply);
appData("24hrvolume", "Volume (24hr): "+filtered[0].volumeUsd24Hr);
appData("24hrwap", "Volume Weighted Average Price (24hr): "+filtered[0].vwap24Hr)
appData("price-change", "24hr Price Change: "+filtered[0].changePercent24Hr+"%");
if(filtered[0].changePercent24Hr<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
}else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
}

//daily, weekly and monthly data to be used also in time_filter.js
const oneDayData = -96, // 24hr/15min = 96
      oneWeekData = -168 // 168hr/1hr = 168
      oneMonthData = -120 // 720hr/6hr = 120
//request function
function getData(url, sliceNum){
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            const data = JSON.parse(request.responseText);
            const cryptoData = data.data;
            const slicedData = cryptoData.slice(sliceNum);
            const formattedData= slicedData.map((function(d){return {"price": (Math.round(d.priceUsd*10000))/10000, "date": new Date(d.time)} ;}));
            console.log(formattedData);
            priceChange = ((formattedData[formattedData.length - 1].price)-(formattedData[0].price))/(formattedData[0].price)*100;
            priceChange = priceChange.toFixed(2);
            //call update func to render the chart with new data
            updateChart(formattedData);
            
            //append coin title and data
           if(selectedCoin != undefined && inputCoin == undefined){
            //filter this coin
            function filterCoin(coin) {return coin.id == selectedCoin;}
            let filtered = topCoins.filter(filterCoin);
            appAll(filtered);
            }else if(inputCoin == undefined){
            function filterCoin(coin) {return coin.id == "bitcoin";}
            let filtered = topCoins.filter(filterCoin);
            appAll(filtered);
            }else{
            function filterCoin(coin) {return coin.id == inputCoin;}
            let filtered = topCoins.filter(filterCoin);
            appAll(filtered);
            }

        //append price change for 7 and 30 days
        if(sliceNum == -168){
            appData("price-change", "7 days Price Change: "+priceChange+"%");
            if(priceChange<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
            }else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
        }else if(sliceNum == -120){ 
            appData("price-change", "30 days Price Change: "+priceChange+"%");
            if(priceChange<0){document.getElementById("chart-header").style.backgroundColor = "#ff9999";
            }else{document.getElementById("chart-header").style.backgroundColor = "#ccffcc";}
        }
        }   
    } 
    request.send();
}
//if selected from dashboard
if(selectedCoin != undefined){
getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15", oneDayData);
}
//default chart
else{
getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=m15", oneDayData);
};
//selected from search input
function clicked() {
    inputCoin = document.getElementById('search').value;
    inputCoin = inputCoin.replace(/\s+/g, '-').toLowerCase();
   
//Request input coin candles data
getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15", oneDayData);
};

document.getElementById('searchSubmit').addEventListener('click', clicked);