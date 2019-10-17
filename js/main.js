/* Main js */

//CoinCap API 
const index = ["&baseId=bitcoin&quoteId=tether", "&baseId=ethereum&quoteId=tether", "&baseId=ripple&quoteId=tether", 
"&baseId=bitcoin-cash&quoteId=tether", "&baseId=litecoin&quoteId=tether", "&baseId=binance-coin&quoteId=tether"];
const myArray = [];
const request = new XMLHttpRequest();

(function loop(i, length) {
    if (i>= length) {
        return;
    }
    const url = "https://api.coincap.io/v2/candles?exchange=binance&interval=m15" + index[i];

    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) { //so we can get the elements in order
            const data = JSON.parse(request.responseText);
            const cryptoData = data.data; //array of objects with 15 minutes candles
            
            const oneDayData = cryptoData.slice(-96); // 24hr/15min = 96 
            const formattedData= oneDayData.map((function(d){return {"price": +d.close, "date": new Date(d.period)} ;}));
            //transform existing array to a new one with the data we need (price and date)
            console.log(formattedData);
            myArray.push(formattedData); //storing each GET response to a global array

            loop(i + 1, length);
        }
    }
    request.send();
})(0, index.length);