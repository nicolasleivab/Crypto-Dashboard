import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { interpolatePath } from "d3-interpolate-path";
import styles from "./D3LineChart.module.css";

const D3LineChart = ({ data, coins }) => {
  // ref initialized null and React will assign it later
  const d3Container = useRef(null);

  // actual d3 code inside useeffect
  useEffect(() => {
    if (data.length > 0) {
      /* D3 Line Chart */
      const nTicks = 10;

      // set the dimensions and margins
      const margin = { top: 20, right: 80, bottom: 60, left: 80 };
      const width = 1100 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const tooltip = { width: 100, height: 100, x: 10, y: -30 };
      console.log(data);
      // scales
      const x = d3.scaleTime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      //remove previous chart when resizing the window
      d3.select(d3Container.current).selectAll("svg").remove();

      // append the svg to the selected div
      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Append x and y
      const appX = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")");
      const appY = svg.append("g");

      // Add the different lines
      const appLine1 = svg.append("path").attr("class", "line1");
      const appLine2 = svg.append("path").attr("class", "line2");
      const appLine3 = svg.append("path").attr("class", "line3");
      const appLine4 = svg.append("path").attr("class", "line4");

      const appYGrid = svg.append("g").attr("class", "ygrid");

      const appZeroGrid = svg.append("g").attr("class", "zerogrid");

      updateChart(data, nTicks);

      //update function
      function updateChart(data, nTicks) {
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // x and y domains
        x.domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        ).nice();
        y.domain([
          d3.min(data, function (d) {
            //mirror axis
            if (coins.length === 1) {
              return Math.min(d.line1);
            }
            if (coins.length === 2) {
              if (
                Math.abs(Math.min(d.line1, d.line2)) >
                Math.abs(Math.max(d.line1, d.line2))
              ) {
                return Math.min(d.line1, d.line2);
              } else {
                return -1 * Math.max(d.line1, d.line2);
              }
            }
            if (coins.length === 3) {
              if (
                Math.abs(Math.min(d.line1, d.line2, d.line3)) >
                Math.abs(Math.max(d.line1, d.line2, d.line3))
              ) {
                return Math.min(d.line1, d.line2, d.line3);
              } else {
                return -1 * Math.max(d.line1, d.line2, d.line3);
              }
            }
            if (coins.length === 4) {
              if (
                Math.abs(Math.min(d.line1, d.line2, d.line3, d.line4)) >
                Math.abs(Math.max(d.line1, d.line2, d.line3, d.line4))
              ) {
                return Math.min(d.line1, d.line2, d.line3, d.line4);
              } else {
                return -1 * Math.max(d.line1, d.line2, d.line3, d.line4);
              }
            }
          }),
          d3.max(data, function (d) {
            if (coins.length === 1) {
              if (Math.abs(Math.min(d.line1)) < Math.abs(Math.max(d.line1))) {
                return Math.max(d.line1);
              } else {
                return -1 * Math.min(d.line1);
              }
            }
            if (coins.length === 2) {
              if (
                Math.abs(Math.min(d.line1, d.line2)) <
                Math.abs(Math.max(d.line1, d.line2))
              ) {
                return Math.max(d.line1, d.line2);
              } else {
                return -1 * Math.min(d.line1, d.line2);
              }
            }
            if (coins.length === 3) {
              if (
                Math.abs(Math.min(d.line1, d.line2, d.line3)) <
                Math.abs(Math.max(d.line1, d.line2, d.line3))
              ) {
                return Math.max(d.line1, d.line2, d.line3);
              } else {
                return -1 * Math.min(d.line1, d.line2, d.line3);
              }
            }
            if (coins.length === 4) {
              if (
                Math.abs(Math.min(d.line1, d.line2, d.line3, d.line4)) <
                Math.abs(Math.max(d.line1, d.line2, d.line3, d.line4))
              ) {
                return Math.max(d.line1, d.line2, d.line3, d.line4);
              } else {
                return -1 * Math.min(d.line1, d.line2, d.line3, d.line4);
              }
            }
          }),
        ]).nice();

        let line1, line2, line3, line4;
        // 1st line
        if (coins[0]) {
          line1 = d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.line1);
            });
        }

        // 2nd line
        if (coins[1]) {
          line2 = d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.line2);
            });
        }

        // 3rd line
        if (coins[2]) {
          line3 = d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.line3);
            });
        }

        // 4th line
        if (coins[3]) {
          line4 = d3
            .line()
            .x(function (d) {
              return x(d.date);
            })
            .y(function (d) {
              return y(d.line4);
            });
        }

        if (coins[0]) {
          svg
            .select(".line1")
            .transition(2000)
            .attr("d", line1(data))
            .attrTween("d", function (d) {
              //interpolation func for a smooth path transition
              var previous = d3.select(this).attr("d");
              var current = line1(data);
              return interpolatePath(previous, current);
            });
        }

        if (coins[1]) {
          svg
            .select(".line2")
            .transition(2000)
            .attr("d", line2(data))
            .attrTween("d", function (d) {
              //interpolation func for a smooth path transition

              var previous = d3.select(this).attr("d");
              var current = line2(data);
              return interpolatePath(previous, current);
            });
        }

        if (coins[2]) {
          svg
            .select(".line3")
            .transition(2000)
            .attr("d", line3(data))
            .attrTween("d", function (d) {
              //interpolation func for a smooth path transition
              var previous = d3.select(this).attr("d");
              var current = line3(data);
              return interpolatePath(previous, current);
            });
        }

        if (coins[3]) {
          svg
            .select(".line4")
            .transition(2000)
            .attr("d", line4(data))
            .attrTween("d", function (d) {
              //interpolation func for a smooth path transition
              var previous = d3.select(this).attr("d");
              var current = line4(data);
              return interpolatePath(previous, current);
            });
        }

        const percentFormat = function (d) {
          return d + "%";
        };

        // Call x axis
        appX
          .transition()
          .attr("class", "axisWhite")
          .call(d3.axisBottom(x).ticks(nTicks))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("transform", "rotate(-40)");
        // Call y axis
        appY
          .transition()
          .attr("class", "axisY")
          .call(d3.axisLeft(y).ticks(nTicks).tickFormat(percentFormat));

        function yGridlines() {
          return d3.axisLeft(y).ticks(nTicks);
        }
        function zeroGridline() {
          return d3.axisLeft(y).ticks(1);
        }

        appYGrid.call(yGridlines().tickSize(-width).tickFormat(""));

        appZeroGrid.call(zeroGridline().tickSize(-width).tickFormat(""));

        const focus = svg
          .append("g")
          .attr("class", "focus ")
          .style("display", "none");

        //bottom line
        focus
          .append("line")
          .attr("class", "x-hover-line hover-line2")
          .attr("y1", 0)
          .attr("y2", height);

        //upper line
        focus
          .append("line")
          .attr("class", "x2-hover-line hover-line2")
          .attr("y1", 0)
          .attr("y2", height);

        focus
          .append("text")
          .attr("class", "d3-text")
          .attr("x", 15)
          .attr("dy", ".31em");

        svg
          .append("rect")
          .attr("class", "overlay")
          .attr("fill", "transparent")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function () {
            focus.style("display", null);
          })

          .on("mouseout", function () {
            focus.style("display", "none");
          })
          .on("mousemove", mousemove);

        //mousemove function adapted from Adam Janes https://github.com/adamjanes/udemy-d3/blob/master/06/6.10.0/js/main.js
        function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]),
            i = d3
              .bisector(function (d) {
                return d.date;
              })
              .left(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i - 1],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          const parseDate = d3.timeFormat("%b %d, %Y");

          focus.attr(
            "transform",
            "translate(" + x(d.date) + "," + y(d.line1) + ")"
          );
          //conditional logic for appending mousemove text

          let line1App, line2App, line3App, line4App;
          if (coins[0]) {
            line1App =
              "<tspan x='0' dy='1.2em' class='btcLegend'>" +
              coins[0].symbol +
              ": " +
              d.line1.toFixed(2) +
              "%" +
              "</tspan>";
          } else {
            line1App = "";
          }
          if (coins[1]) {
            line2App =
              "<tspan x='0' dy='1.2em'>" +
              coins[1].symbol +
              ": " +
              d.line2.toFixed(2) +
              "%" +
              "</tspan>";
          } else {
            line2App = "";
          }

          if (coins[2]) {
            line3App =
              "<tspan x='0' dy='1.2em'>" +
              coins[2].symbol +
              ": " +
              d.line3.toFixed(2) +
              "%" +
              "</tspan>";
          } else {
            line3App = "";
          }

          if (coins[3]) {
            line4App =
              "<tspan x='0' dy='1.2em'>" +
              coins[3].symbol +
              ": " +
              d.line4.toFixed(2) +
              "%" +
              "</tspan>";
          } else {
            line4App = "";
          }

          focus
            .select("text")
            .html(
              "<tspan x='0' dy='1.2em'>" +
                "date: " +
                parseDate(d.date) +
                "</tspan>" +
                line1App +
                line2App +
                line3App +
                line4App
            );

          focus.select(".x-hover-line").attr("y2", height - y(d.line1));
          focus
            .select(".x2-hover-line")
            .attr("y2", height - y(d.line1) + -height);
        }
      }
    }
  }, [data, d3Container.current]);

  return (
    <svg
      className={styles.d3chart}
      width={1100}
      height={500}
      ref={d3Container}
    ></svg>
  );
};

export default D3LineChart;
