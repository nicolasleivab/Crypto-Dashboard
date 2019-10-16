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

// Add x axis, I'm not formatting the date for this viz class
const x = d3.scaleLinear()
  .domain(d3.extent(this.formattedData, function(d) { return d.date; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(3)).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-10)");

// Add y axis
const y = d3.scaleLinear()
  .domain([d3.min(this.formattedData, function(d) { return d.price; }), d3.max(this.formattedData, function(d) { return d.price; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y).ticks(5));

// Add the line
svg.append("path")
  .datum(this.formattedData)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.price) })
    )

//append this.coin text
svg.append("text")
  .attr("x", width/2)
  .attr("y", 0)
  .attr("text-anchor", "middle")
  .text(this.coin)

    }
};