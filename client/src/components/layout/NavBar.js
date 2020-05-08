import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthContext from "../../context/auth/authContext";

const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const {
    isAuthenticated,
    logoutUser,
    user,
    loginUser,
    loadUser,
  } = authContext;

  const onLogout = () => {
    logoutUser();
  };

  const authLinks = (
    <div className={styles.flexContainer}>
      <li className={styles.userDisplay}>Welcome {user && user.name}!</li>
      <li>
        <a
          href="#!"
          onClick={onLogout}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p className={styles.hide}>Logout</p>
          <ExitToAppIcon fontSize="large" className={styles.Icon} />
        </a>
      </li>
    </div>
  );

  const guessLinks = (
    <div className={styles.flexContainer}>
      <li>
        <a href="#">Sign In</a>
      </li>
    </div>
  );
  useEffect(() => {
    //loginUser(user);
  }, []);
  return (
    <div className={styles.NavBar}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{title}</p>
        <ShowChartIcon fontSize="large" style={{ marginLeft: 10 }} />
      </div>
      <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

NavBar.defaultProps = {
  title: "Crypto Performance",
};

export default NavBar;
