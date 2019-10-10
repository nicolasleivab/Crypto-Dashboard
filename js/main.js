/* Main js */

const apiKey = {
    key: "xxxxxxxx" //insert your private api key from coinmarketcap
};

request('GET', 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?' + 'CMC_PRO_API_KEY=' + apiKey.key)
.then((response) => {
    const data = JSON.parse(response.target.responseText)
    console.log(data);
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