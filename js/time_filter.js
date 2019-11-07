/* Time Filter */
//getelementbyID functions
const elem = (i) => document.getElementById(i);
const addClass = (i, className) => elem(i).classList.add(className);
const removeClass = (i, className) => elem(i).classList.remove(className);
const addEvent = (i, ac, funcID) => elem(i).addEventListener(ac, funcID);
//one day, week and month data
function clickedDay() {
    //add/remove focus class
    addClass('day', 'focus');
    removeClass('week', 'focus');
    removeClass('month', 'focus');
    if(selectedCoin != undefined && inputCoin == undefined){ //if the coin was selected from the dashboard
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=m15", oneDayData)
    }else if(inputCoin == undefined){ //default coin = "bitcoin"
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=m15", oneDayData)
    }else{ //if the coin was selected from the search input
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=m15", oneDayData)
    }
};
addEvent('day', 'click', clickedDay);
function clickedWeek(){
    addClass('week', 'focus');
    removeClass('day', 'focus');
    removeClass('month', 'focus');
    if(selectedCoin != undefined && inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=h1", oneWeekData)
    }else if(inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=h1", oneWeekData)
    }else{
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=h1", oneWeekData)
    }
};
addEvent('week', 'click', clickedWeek);
function clickedMonth(){
    addClass('month', 'focus');
    removeClass('day', 'focus');
    removeClass('week', 'focus');
    document.getElementById('day').classList.remove('focus');
    if(selectedCoin != undefined && inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/"+selectedCoin+"/history?interval=h6", oneMonthData)
    }else if(inputCoin == undefined){
        getData("https://api.coincap.io/v2/assets/bitcoin/history?interval=h6", oneMonthData)
    }else{
        getData("https://api.coincap.io/v2/assets/"+inputCoin+"/history?interval=h6", oneMonthData)
    }
};
addEvent('month', 'click', clickedMonth);