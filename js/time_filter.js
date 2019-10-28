/* Time Filter */

//one day, week and month data
function clickedDay() {
    //add/remove focus class
    document.getElementById('day').classList.add('focus');
    document.getElementById('week').classList.remove('focus');
    document.getElementById('month').classList.remove('focus');
    if(selectedCoin != undefined && inputCoin == undefined){ //if the coin was selected from the dashboard
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15", oneDayData)
    }else if(inputCoin == undefined){ //default coin = "bitcoin"
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=m15", oneDayData)
    }else{ //if the coin was selected from the search input
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15", oneDayData)
    }
};
document.getElementById('day').addEventListener('click', clickedDay);
function clickedWeek(){
    document.getElementById('week').classList.add('focus');
    document.getElementById('day').classList.remove('focus');
    document.getElementById('month').classList.remove('focus');
    if(selectedCoin != undefined && inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=h1", oneWeekData)
    }else if(inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=h1", oneWeekData)
    }else{
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=h1", oneWeekData)
    }
};
document.getElementById('week').addEventListener('click', clickedWeek);
function clickedMonth(){
    document.getElementById('month').classList.add('focus');
    document.getElementById('week').classList.remove('focus');
    document.getElementById('day').classList.remove('focus');
    if(selectedCoin != undefined && inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=h6", oneMonthData)
    }else if(inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=h6", oneMonthData)
    }else{
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=h6", oneMonthData)
    }
};
document.getElementById('month').addEventListener('click', clickedMonth);