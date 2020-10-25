import React, { useState, useEffect } from 'react';
import useWindowSize from '../components/assets/hooks/useWindowSize';
import D3LineChart from '../components/D3LineChart/D3LineChart';
import Legend from '../components/Legend/Legend';
import TimeFilter from '../components/TimeFilter/TimeFilter';
import styles from './Home.module.css';

const ChartContainer = (props) => {
  const [chartWidth, setChartWidth] = useState(1100);
  const [chartHeight, setChartHeight] = useState(500);
  const [windowWidth, windowHeight] = useWindowSize();
  const [responsiveTicks, setTicks] = useState(10);

  const {
    modal,
    filteredCoins,
    timeFilterHandle,
    priceAction,
    formattedPA,
  } = props;

  useEffect(() => {
    if (windowWidth > 1000) {
      setTicks(10);
      setChartWidth(1100);
    } else if (windowWidth > 800) {
      setChartWidth(700);
      setTicks(7);
    } else if (windowWidth > 600) {
      setChartWidth(550);
      setTicks(6);
    } else {
      setChartWidth(400);
      setTicks(5);
    }
  }, [windowWidth]);
  return (
    <div className={modal ? styles.D3ContainerBlur : styles.D3Container}>
      <Legend coins={filteredCoins} chartWidth={chartWidth} />
      <TimeFilter
        timeFilter={timeFilterHandle}
        priceAction={priceAction}
        modal={modal}
      />
      <D3LineChart
        data={formattedPA}
        coins={filteredCoins}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        responsiveTicks={responsiveTicks}
      />
    </div>
  );
};

export default ChartContainer;
