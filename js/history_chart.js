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
  .attr("stroke", "#b3b3ff")
  .attr("stroke-width", 1)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.price) })
    )
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

const focus = svg.append("g")
  .attr("class", "focus")
  .style("display", "none");

  //bottom line
focus.append("line")
  .attr("class", "x-hover-line hover-line2")
  .attr("y1", 0)
  .attr("y2", height);

  //upper line
focus.append("line")
  .attr("class", "x2-hover-line hover-line2")
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
.on("mouseout", function() { focus.style("display", "none"); })
.on("mousemove", mousemove);


//mousemove function adapted from Adam Janes https://github.com/adamjanes/udemy-d3/blob/master/06/6.10.0/js/main.js
function mousemove() {
var x0 = x.invert(d3.mouse(this)[0]),
  i = d3.bisector(function(d) { return d.date; }).left(vis.formattedData, x0, 1),
  d0 = vis.formattedData[i - 1],
  d1 = vis.formattedData[i],
  d = x0 - d0.date > d1.date - x0 ? d1 : d0;
focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
focus.select("text").text(d.price);
focus.select(".x-hover-line").attr("y2", (height - y(d.price)));
focus.select(".x2-hover-line").attr("y2", (height - y(d.price)) + (- height));

}

//append this.coin text to innetHTML
document.getElementById("title").innerHTML = vis.coin;

    }

    updateChart(){

    }
};
