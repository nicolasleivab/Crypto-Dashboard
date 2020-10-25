import React, { useState, useEffect } from 'react';
import styles from './TimeFilter.module.css';

const TimeFilter = (props) => {
  const { timeFilter, priceAction, modal } = props;
  const [btnMatrix, setMatrix] = useState([true, false, false, false]);

  const setFocus = (e) => {
    const base = [false, false, false, false];
    base[e.target.id] = true;
    setMatrix(base);
    timeFilter(e);
  };

  useEffect(() => {
    setMatrix([true, false, false, false]);
  }, [priceAction]);

  return (
    <div className={styles.TimeFilter}>
      <button
        className={btnMatrix[0] ? styles.btnFocus : styles.btnSecondary}
        id='0'
        onClick={(e) => setFocus(e)}
        disabled={modal}
      >
        1 year
      </button>
      <button
        className={btnMatrix[1] ? styles.btnFocus : styles.btnSecondary}
        id='1'
        onClick={(e) => setFocus(e)}
        disabled={modal}
      >
        6 months
      </button>
      <button
        className={btnMatrix[2] ? styles.btnFocus : styles.btnSecondary}
        id='2'
        onClick={(e) => setFocus(e)}
        disabled={modal}
      >
        3 months
      </button>
      <button
        className={btnMatrix[3] ? styles.btnFocus : styles.btnSecondary}
        id='3'
        onClick={(e) => setFocus(e)}
        disabled={modal}
      >
        1 month
      </button>
    </div>
  );
};

export default TimeFilter;
