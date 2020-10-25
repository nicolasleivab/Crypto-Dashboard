import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { logoutUser } from 'actions/auth';
import { setModal } from 'actions/modal';

const NavBar = (props) => {
  const { isAuthenticated, logoutUser, user, setModal, modal, title } = props;

  const tabIndexProp = modal ? {} : { tabIndex: 1 };

  const authLinks = (
    <div className={styles.flexContainer}>
      <li className={styles.userDisplay}>Welcome {user && user.name}!</li>
      <li>
        <div
          onClick={() => logoutUser()}
          onKeyPress={(e) => (e.key === 'Enter' ? logoutUser() : null)}
          style={{ display: 'flex', alignItems: 'center' }}
          {...tabIndexProp}
        >
          <p className={styles.hide}>Logout</p>
          <ExitToAppIcon fontSize='large' className={styles.Icon} />
        </div>
      </li>
    </div>
  );

  const guessLinks = (
    <div className={styles.flexContainer}>
      <li>
        <p
          onClick={() => setModal()}
          onKeyPress={(e) => (e.key === 'Enter' ? setModal() : null)}
          {...tabIndexProp}
        >
          Sign In
        </p>
      </li>
    </div>
  );
  useEffect(() => {
    //loginUser(user);
  }, []);

  return (
    <nav className={modal ? styles.blurMode : styles.NavBar}>
      <div className={styles.titleContainer}>
        <InsertChartIcon
          fontSize='large'
          style={{ marginRight: 2, marginTop: 2 }}
        />
        <p className={styles.title}>{title}</p>
      </div>
      <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
    </nav>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

NavBar.defaultProps = {
  title: 'Crypto Performance',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  modal: state.modal.modal,
});

export default connect(mapStateToProps, { logoutUser, setModal })(NavBar);
