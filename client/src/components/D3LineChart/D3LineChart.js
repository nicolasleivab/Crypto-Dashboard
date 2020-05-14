import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { interpolatePath } from "d3-interpolate-path";

/* Component */
const D3LineChart = ({ data }) => {
  // ref initialized null and React will assign it later
  const d3Container = useRef(null);

  // actual d3 code inside useeffect
  useEffect(() => {
    if (data.length > 0) {
      /* D3 Line Chart */
      let margin,
        width,
        height,
        tooltip,
        x,
        y,
        appX,
        appY,
        svg,
        appYGrid,
        appZeroGrid,
        nTicks = 10;

      // set the dimensions and margins
      margin = { top: 20, right: 80, bottom: 60, left: 80 };
      width = 1100 - margin.left - margin.right;
      height = 500 - margin.top - margin.bottom;
      tooltip = { width: 100, height: 100, x: 10, y: -30 };
      console.log(data);
      // scales
      x = d3.scaleTime().range([0, width]);
      y = d3.scaleLinear().range([height, 0]);

      // append the svg to the selected div
      svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Append x and y
      appX = svg.append("g").attr("transform", "translate(0," + height + ")");
      appY = svg.append("g");

      // Add the different lines
      const appLineBTC = svg.append("path").attr("class", "line1");
      const appLineETH = svg.append("path").attr("class", "line2");
      const appLineXRP = svg.append("path").attr("class", "line3");
      const appLineBCH = svg.append("path").attr("class", "line4");

      appYGrid = svg.append("g").attr("class", "ygrid");

      appZeroGrid = svg.append("g").attr("class", "zerogrid");

      updateChart(data, nTicks);

      //update function
      function updateChart(data, nTicks) {
        console.log(data);
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        // x and y domains
        x.domain(
          d3.extent(data, function (d) {
            return d.date;
          })
        ).nice();
        y.domain([
          d3.min(data, function (d) {
            //mirror axis
            if (
              Math.abs(Math.min(d.BTC, d.ETH, d.XRP, d.BCH)) >
              Math.abs(Math.max(d.BTC, d.ETH, d.XRP, d.BCH))
            ) {
              return Math.min(d.BTC, d.ETH, d.XRP, d.BCH);
            } else {
              return -1 * Math.max(d.BTC, d.ETH, d.XRP, d.BCH);
            }
          }),
          d3.max(data, function (d) {
            if (
              Math.abs(Math.min(d.BTC, d.ETH, d.XRP, d.BCH)) <
              Math.abs(Math.max(d.BTC, d.ETH, d.XRP, d.BCH))
            ) {
              return Math.max(d.BTC, d.ETH, d.XRP, d.BCH);
            } else {
              return -1 * Math.min(d.BTC, d.ETH, d.XRP, d.BCH);
            }
          }),
        ]).nice();

        // BTC line
        const lineBTC = d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.BTC);
          });

        // ETH line
        const lineETH = d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.ETH);
          });

        // XRP line
        const lineXRP = d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.XRP);
          });

        // BCH line
        const lineBCH = d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.BCH);
          });

        svg
          .select(".line1")
          .transition(2000)
          .attr("d", lineBTC(data))
          .attrTween("d", function (d) {
            //interpolation func for a smooth path transition
            var previous = d3.select(this).attr("d");
            var current = lineBTC(data);
            return interpolatePath(previous, current);
          });

        svg
          .select(".line2")
          .transition(2000)
          .attr("d", lineETH(data))
          .attrTween("d", function (d) {
            //interpolation func for a smooth path transition

            var previous = d3.select(this).attr("d");
            var current = lineETH(data);
            return interpolatePath(previous, current);
          });

        svg
          .select(".line3")
          .transition(2000)
          .attr("d", lineXRP(data))
          .attrTween("d", function (d) {
            //interpolation func for a smooth path transition
            var previous = d3.select(this).attr("d");
            var current = lineXRP(data);
            return interpolatePath(previous, current);
          });

        svg
          .select(".line4")
          .transition(2000)
          .attr("d", lineBCH(data))
          .attrTween("d", function (d) {
            //interpolation func for a smooth path transition
            var previous = d3.select(this).attr("d");
            var current = lineBCH(data);
            return interpolatePath(previous, current);
          });

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
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
          const parseDate = d3.timeFormat("%b %d, %Y");

          focus.attr(
            "transform",
            "translate(" + x(d.date) + "," + y(d.BTC) + ")"
          );
          //conditional logic for appending mousemove text

          let BTCapp, XRPapp, BCHapp, ETHapp;

          BTCapp =
            "<tspan x='0' dy='1.2em' class='btcLegend'>" +
            "BTC: " +
            d.BTC.toFixed(2) +
            "%" +
            "</tspan>";

          XRPapp =
            "<tspan x='0' dy='1.2em'>" +
            "XRP: " +
            d.XRP.toFixed(2) +
            "%" +
            "</tspan>";

          XRPapp = "";

          BCHapp =
            "<tspan x='0' dy='1.2em'>" +
            "BCH: " +
            d.BCH.toFixed(2) +
            "%" +
            "</tspan>";

          ETHapp =
            "<tspan x='0' dy='1.2em'>" +
            "ETH: " +
            d.ETH.toFixed(2) +
            "%" +
            "</tspan>";

          focus
            .select("text")
            .html(
              "<tspan x='0' dy='1.2em'>" +
                "date: " +
                parseDate(d.date) +
                "</tspan>" +
                BTCapp +
                XRPapp +
                BCHapp +
                ETHapp
            );

          focus.select(".x-hover-line").attr("y2", height - y(d.BTC));
          focus
            .select(".x2-hover-line")
            .attr("y2", height - y(d.BTC) + -height);
        }
      }
    }
  }, [data, d3Container.current]);

  return <div className="d3chart" ref={d3Container}></div>;
};

export default D3LineChart;
