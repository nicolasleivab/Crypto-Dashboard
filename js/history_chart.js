/* D3 History Line Chart */

class HistLineChart{
    constructor(_formattedData, _coin,){
    this.formattedData = _formattedData;
    this.coin = _coin;
}
    //add methods to the class
    drawChart(){

    /* D3 code */

// set the dimensions of the graph
const margin = {top: 100, right: 50, bottom: 50, left: 100},
width = 700 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom,
vis = this;

// append svg to current parentDiv
const svg = d3.select("#chart")
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
  .call(d3.axisBottom(x).ticks(10)).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-10)");

// Add y axis
const y = d3.scaleLinear()
  .domain([d3.min(vis.formattedData, function(d) { return d.price; }), d3.max(vis.formattedData, function(d) { return d.price; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y).ticks(10));

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
    .on("mouseout", function() { focus.style("display", "none"); });

//append this.coin text to innetHTML
document.getElementById("title").innerHTML = vis.coin;

    }

    updateChart(){

    }
};
