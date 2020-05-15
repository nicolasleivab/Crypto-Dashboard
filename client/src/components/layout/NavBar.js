import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";

const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;

  const modalContext = useContext(ModalContext);
  const { setModal } = modalContext;

  const onLogout = () => {
    logoutUser();
  };

  const authLinks = (
    <div className={styles.flexContainer}>
      <li className={styles.userDisplay}>Welcome {user && user.name}!</li>
      <li>
        <div
          onClick={onLogout}
          style={{ display: "flex", alignItems: "center" }}
        >
          <p className={styles.hide}>Logout</p>
          <ExitToAppIcon fontSize="large" className={styles.Icon} />
        </div>
      </li>
    </div>
  );

  const guessLinks = (
    <div className={styles.flexContainer}>
      <li>
        <p onClick={() => setModal()}>Sign In</p>
      </li>
    </div>
  );
  useEffect(() => {
    //loginUser(user);
  }, []);
  return (
    <div className={styles.NavBar}>
      <div className={styles.titleContainer}>
        <InsertChartIcon
          fontSize="large"
          style={{ marginRight: 2, marginTop: 2 }}
        />
        <p className={styles.title}>{title}</p>
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
