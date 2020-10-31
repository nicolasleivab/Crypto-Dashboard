import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './Alert.module.css';

const Alert = (props) => {
  const { alerts } = props;
  return alerts && alerts.length > 0 ? (
    alerts.map((alert) => (
      <div key={alert.id} className={styles.alertContainerRed}>
        <i
          className='fa fa-info-circle'
          style={{ marginRight: 5, color: '#FFF' }}
        />
        <p className={styles.alertTextWhite}>{alert.msg}</p>
      </div>
    ))
  ) : (
    <Fragment></Fragment>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Alert);
