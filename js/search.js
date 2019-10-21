/* Search js */

function clicked() {
    let inputCoin = document.getElementById('search').value;
    console.log(inputCoin);
   
//Request input coin candles data
let url = "https://api.coincap.io/v2/candles?exchange=binance&interval=m15&baseId="+inputCoin+"&quoteId=tether";

let request = new XMLHttpRequest();
request.open("GET", url);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        let data = JSON.parse(request.responseText);
        console.log(data.data);
        
        
    }
   
}
request.send();
}


document.getElementById('searchSubmit').addEventListener('click', clicked);
