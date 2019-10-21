/* Main js */

//CoinCap API 
//list of coins to be replaced
let coin = ["template", "template", "template", "template", "template", "template", "template", "template", "template", "template", "template"];

const bindsArray = [], parentsArray = [], titlesArray = [], pricesArray = [], changeArray = [], headerArray = [], datesArray = [];
for(let n = 0; n < 11; n ++){
bindsArray.push("lineChart" + n);
parentsArray.push("#chart" + n);
titlesArray.push("title" + n);
pricesArray.push("price" + n);
changeArray.push("change" + n);
headerArray.push("header" + n);
datesArray.push("date" + n);
};

const request = new XMLHttpRequest();

(function loop(i, length) {
    if (i>= length) {
        return;
    }
    let url = "https://api.coincap.io/v2/assets/";
    //first the list of coins with ranks
    if(i>0){
     url = "https://api.coincap.io/v2/assets/"+coin[i]+"/history?interval=m15";
    }
    
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) { //so we can get the elements in order
            const data = JSON.parse(request.responseText);
            const cryptoData = data.data; //array of objects with 15 minutes candles
            const topTen = data.data.slice(0,10);
            //get first 10 ranked coins
            const finalArray = topTen.map(function (obj) {
                return obj.id;
              });
            //replace original coins array with the updated top ten coins (when i = 0)
            if(finalArray[0]!=undefined){coin = [finalArray[0]].concat(finalArray)}
            
            //after updating topTen coins
            if(i>0){
            const oneDayData = cryptoData.slice(-96); // 24hr/15min = 96 
            const formattedData= oneDayData.map((function(d){return {"price": (Math.round(d.priceUsd*10000))/10000, "date": new Date(d.time)} ;}));
            
            /* D3 viz */
            //create a new binding with each loop for each coin
            bindsArray[i] = new LineChart(parentsArray[i], formattedData, coin[i], titlesArray[i], pricesArray[i], changeArray[i], headerArray[i], datesArray[i]);

            //calling the  drawChart method for each coin
            bindsArray[i].drawChart();
            }

            loop(i + 1, length);
        }
    }
    request.send();
})(0, coin.length);