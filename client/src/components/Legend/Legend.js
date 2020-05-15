import React from "react";
import styles from "./Legend.module.css";

const Legend = ({ coins }) => {
  return (
    <div className={styles.Legend}>
      {coins.length >= 1 && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div className={styles.firstLine}></div>
          <p>{coins[0].name}</p>
          <p style={{ fontSize: "1rem" }}>{" (" + coins[0].symbol + ")"}</p>
        </div>
      )}
      {coins.length >= 2 && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div className={styles.secondLine}></div>
          <p>{coins[1].name}</p>
          <p style={{ fontSize: "1rem" }}>{" (" + coins[1].symbol + ")"}</p>
        </div>
      )}
      {coins.length >= 3 && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div className={styles.thirdLine}></div>
          <p>{coins[2].name}</p>
          <p style={{ fontSize: "1rem" }}>{" (" + coins[2].symbol + ")"}</p>
        </div>
      )}
      {coins.length >= 4 && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div className={styles.fourhtLine}></div>
          <p>{coins[3].name}</p>
          <p style={{ fontSize: "1rem" }}>{" (" + coins[3].symbol + ")"}</p>
        </div>
      )}
    </div>
  );
};

export default Legend;
