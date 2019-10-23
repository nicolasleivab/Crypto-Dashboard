/* D3 History Line Chart */

// set the dimensions of the graph
const margin = {top: 100, right: 50, bottom: 50, left: 50},
width = 700 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append svg to current parentDiv
const svg = d3.select("#chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);
const g = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x axis
const x = d3.scaleTime().range([ 0, width ]);

// Add y axis
const y = d3.scaleLinear().range([ height, 0 ]);

// define the line
const defLine = g.append("path")
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "#b3b3ff")
  .attr("stroke-width", 1);

//call each axis
const yCall = d3.axisLeft().ticks(10);
const xCall = d3.axisBottom().ticks(10);

//append each axis
const xApp = g.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height +")");

const yApp = g.append("g")
.attr("class", "y axis");

function updateChart(formattedData){

// Update scales
x.domain(d3.extent(formattedData, function(d) { return d.date; }))
xApp.transition().call(d3.axisBottom(x).ticks(10)).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-10)");
y.domain([d3.min(formattedData, function(d) { return d.price; }), d3.max(formattedData, function(d) { return d.price; })])
yApp.transition().call(d3.axisLeft(y).ticks(10));
  
const focus =  g.append("g")
.attr("class", "focus ")
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

g.append("rect")
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
  i = d3.bisector(function(d) { return d.date; }).left(formattedData, x0, 1),
  d0 = formattedData[i - 1],
  d1 = formattedData[i],
  d = x0 - d0.date > d1.date - x0 ? d1 : d0;
focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
focus.select("text").text(d.price);
focus.select(".x-hover-line").attr("y2", (height - y(d.price)));
focus.select(".x2-hover-line").attr("y2", (height - y(d.price)) + (- height));

}

const line = d3.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.price); });

g.select(".line")
.transition(1000)
.attr("d", line(formattedData));

};
