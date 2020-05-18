import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import styles from "./Alert.module.css";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) =>
      alert.type === "Red" ? (
        <div key={alert.id} className={styles.alertContainerRed}>
          <i
            className="fa fa-info-circle"
            style={{ marginRight: 5, color: "#555" }}
          />
          <p className={styles.alertTextGray}>{alert.msg}</p>
        </div>
      ) : (
        <div key={alert.id} className={styles.alertContainerGreen}>
          <i
            className="fa fa-check"
            style={{ marginRight: 5, color: "#fff" }}
          />
          <p className={styles.alertTextWhite}>{alert.msg}</p>
        </div>
      )
    )
  );
};

export default Alert;
