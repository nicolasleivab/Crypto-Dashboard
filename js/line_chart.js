/* D3 Line Chart */

//create a function constructor to use with several coins
function LineChart(_parentDiv, _coin){
    this.parentDiv = _parentDiv; //this div target or parent element
    this.coin = _coin;

    this.drawChart();
};

/* Adding methods to the prototype */
LineChart.prototype.drawChart = function(){

    //actual viz code

this.update();
};

LineChart.prototype.update = function(){

    //D3 update function

}