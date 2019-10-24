/* D3 Line Chart */

//Create a class to use with different coins
class LineChart {
    constructor(_parentDiv, _formattedData, _coin, _titleDiv, _priceDiv, _changeDiv, _coinHeader, _dateDiv) {
        this.parentDiv = _parentDiv; //this div target or parent element
        this.formattedData = _formattedData;
        this.coin = _coin;
        this.titleDiv = _titleDiv;
        this.priceDiv = _priceDiv;
        this.changeDiv = _changeDiv;
        this.coinHeader = _coinHeader;
        this.dateDiv = _dateDiv;
    
    }
// Add methods to the class 
    drawChart() {

/* Actual D3 code */

// set the dimensions of the graph
const margin = {top: 25, right: 0, bottom: 5, left: 50},
width = 300 - margin.left - margin.right,
height = 70 - margin.top - margin.bottom,
vis = this;

// append svg to current parentDiv
const svg = d3.select(vis.parentDiv)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add x axis with formatted time
const x = d3.scaleTime()
  .domain(d3.extent(vis.formattedData, function(d) { return d.date; }))
  .range([ 0, width ]);
/*svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(3)).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-10)");*/

// Add y axis
const y = d3.scaleLinear()
  .domain([d3.min(vis.formattedData, function(d) { return d.price; }), d3.max(vis.formattedData, function(d) { return d.price; })])
  .range([ height, 0 ]);
/*svg.append("g")
  .call(d3.axisLeft(y).ticks(5));*/

// Add the line
svg.append("path")
  .datum(vis.formattedData)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.price) })
    )
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

//filter this coin
function filterCoin(coin) {
  return coin.id == vis.coin;
}       
let filtered = topOneHundred.filter(filterCoin);
//append this.coin text to innetHTML and as a query parameter
document.getElementById(vis.titleDiv).innerHTML = "<a href=chart.html?selectedCoin=" + vis.coin+">"+filtered[0].name+"</a>";
//filter and append 24 hr change
document.getElementById(vis.changeDiv).innerHTML = "24hr Change: "+filtered[0].changePercent24Hr+"(%)";
if(filtered[0].changePercent24Hr<0){
document.getElementById(vis.coinHeader).style.backgroundColor = "#ff9999";
}
else{
  document.getElementById(vis.coinHeader).style.backgroundColor = "#ccffcc";
}

const focus = svg.append("g")
  .attr("class", "focus")
  .style("display", "none");

  //bottom line
focus.append("line")
  .attr("class", "x-hover-line hover-line")
  .attr("y1", 0)
  .attr("y2", height);

  //upper line
focus.append("line")
  .attr("class", "x2-hover-line hover-line")
  .attr("y1", 0)
  .attr("y2", height);

focus.append("circle")
.attr("r", 2);

focus.append("text")
.attr("x", 15)
  .attr("dy", ".31em");

svg.append("rect")
.attr("class", "overlay")
.attr("fill", "transparent")
.attr("width", width)
.attr("height", height)
.on("mouseover", function() { focus.style("display", null); })
.on("mouseout", reset)
.on("mousemove", mousemove);

const formatDate = d3.timeFormat("%m/%d %H:%M");

//mousemove function adapted from Adam Janes https://github.com/adamjanes/udemy-d3/blob/master/06/6.10.0/js/main.js
function mousemove() {
var x0 = x.invert(d3.mouse(this)[0]),
  i = d3.bisector(function(d) { return d.date; }).left(vis.formattedData, x0, 1),
  d0 = vis.formattedData[i - 1],
  d1 = vis.formattedData[i],
  d = x0 - d0.date > d1.date - x0 ? d1 : d0;
focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
focus.select(".x-hover-line").attr("y2", (height - y(d.price)));
focus.select(".x2-hover-line").attr("y2", (height - y(d.price)) + (- height));
svg.selectAll("text").style('fill', 'transparent'); //remove text from svg
//append price text to priceDiv
document.getElementById(vis.priceDiv).innerHTML = "Price: $" + (focus.select("text").text(function() { return d.price; })._groups[0][0].innerHTML);
document.getElementById(vis.dateDiv).innerHTML = "Date time: " + (focus.select("text").text(function() { return formatDate(d.date); })._groups[0][0].innerHTML);

}

//reset pricediv function on mouseout
function reset(){
  document.getElementById(vis.priceDiv).innerHTML = "Price: $" + vis.formattedData[95].price;
  document.getElementById(vis.dateDiv).innerHTML = "Date time: " + formatDate(vis.formattedData[95].date);
  focus.style("display", "none");
  };

reset();

    }
};