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
height = 250 - margin.top - margin.bottom,
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
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(3)).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-10)");

// Add y axis
const y = d3.scaleLinear()
  .domain([d3.min(vis.formattedData, function(d) { return d.price; }), d3.max(vis.formattedData, function(d) { return d.price; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y).ticks(5));

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

//append this.coin text
svg.append("text")
  .attr("x", width/2)
  .attr("y", 0)
  .attr("text-anchor", "middle")
  .text(vis.coin);

const focus = svg.append("g")
  .attr("class", "focus")
  .style("display", "none");

focus.append("line")
  .attr("class", "x-hover-line hover-line")
  .attr("y1", 0)
  .attr("y2", height);

focus.append("circle")
.attr("r", 3);

focus.append("text")
.attr("x", 15)
  .attr("dy", ".31em");

svg.append("rect")
.attr("class", "overlay")
.attr("fill", "transparent")
.attr("width", width)
.attr("height", height)
.on("mouseover", function() { focus.style("display", null); })
.on("mouseout", function() { focus.style("display", "none"); })
.on("mousemove", mousemove);

//mousemove function adapted from Adam Janes https://github.com/adamjanes/udemy-d3/blob/master/06/6.10.0/js/main.js
function mousemove() {
    console.log(vis.formattedData);
var x0 = x.invert(d3.mouse(this)[0]),
  i = d3.bisector(function(d) { return d.date; }).left(vis.formattedData, x0, 1),
  d0 = vis.formattedData[i - 1],
  d1 = vis.formattedData[i],
  d = x0 - d0.date > d1.date - x0 ? d1 : d0;
focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
focus.select("text").text(function() { return d.price; });
focus.select(".x-hover-line").attr("y2", height - y(d.price));
}

    }
};