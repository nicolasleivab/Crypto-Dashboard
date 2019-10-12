/* Main js */

request('GET', 'https://api.coincap.io/v2/assets/')
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    console.log(data);
    const cryptoData = data.data;
        
function displayCryptoBoard(arr) {
    let theExport = ""; //initialize the export
    arr.forEach((crypto) => theExport += '<tr><td>' + crypto.rank + '</td><td>' + crypto.name + '</td><td>' + crypto.priceUsd+ '</td></tr>'); //prints the row tables
    document.getElementById("crypto-table").innerHTML = theExport;
}

displayCryptoBoard(cryptoData); //call table function with the array and append to #crypto-table

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