/* D3 Line Chart */

//Create a class to use with different coins
class LineChart {
    constructor(_parentDiv, _formattedData, _coin) {
        this.parentDiv = _parentDiv; //this div target or parent element
        this.formattedData = _formattedData;
        this.coin = _coin;
    
    }
// Add methods to the class 
    drawChart() {

/* Actual D3 code */

// set the dimensions of the graph
const margin = {top: 100, right: 50, bottom: 30, left: 50},
width = 400 - margin.left - margin.right,
height = 250 - margin.top - margin.bottom;

// append svg to current parentDiv
const svg = d3.select(this.parentDiv)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    }
};