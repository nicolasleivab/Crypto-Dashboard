/* Main js */

const apiKey = {
    key: "xxxxxxx" //insert your private api key from coinmarketcap
};

request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?&symbol=BTC,ETH,XRP,USDT,BCH,LTC,EOS,BNB,BSV,XLM&' + 'CMC_PRO_API_KEY=' + apiKey.key)
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    console.log(data.data);
    const add = data.data;
    const test = [add.BTC, add.ETH, add.XRP, add.USDT, add.BCH, add.LTC, add.EOS, add.BNB, add.BSV, add.XLM];//array of objects with crypto
    
    function displayCryptoBoard() {
        let theExport = ""; //initialize the export
        test.forEach((crypto) => theExport += '<tr><td>' + crypto.cmc_rank + '</td><td>' + crypto.name + '</td><td>' + crypto.quote.USD.price+ '</td></tr>'); //prints the row tables
        document.getElementById("crypto-table").innerHTML = theExport;
    }

displayCryptoBoard(test); //call table function with the array and append to #crypto-table

}).catch()

function request(method, url) {
    return new Promise(function (resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });
    
}