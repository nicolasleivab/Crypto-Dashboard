import React, { useState, useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";
import useWindowSize from "../assets/hooks/useWindowSize";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./AuthForm.module.css";

const AuthForm = (props) => {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const {
    loginUser,
    registerUser,
    error,
    clearErrors,
    isAuthenticated,
  } = authtContext;
  const { hideModal, setModal, modal } = modalContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [authForm, setForm] = useState("login");

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    /*if (email === "" || password === "") {
      setAlert("Please fill out all fields", "Red");
    } else {
      loginUser(user);
    }*/
    if (authForm === "login") {
      loginUser(user);
    } else {
      registerUser(user);
    }
  };

  const [width, height] = useWindowSize();

  return (
    <div className={authForm === "login" ? styles.Login : styles.Register}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginTop: 0,
        }}
      >
        <CloseIcon className={styles.closeIcon} onClick={() => hideModal()} />
        <p className={styles.title}>
          {authForm === "login" ? "Member Login" : "Register Account"}
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          onSubmit={onSubmit}
        >
          {authForm === "register" && (
            <input
              type="name"
              placeholder="Name"
              name="name"
              value={name}
              required="required"
              onChange={onChange}
              maxLength={35}
              style={{ paddingLeft: 15 }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            required="required"
            onChange={onChange}
            maxLength={35}
            style={
              authForm === "login" ? { paddingLeft: 35 } : { paddingLeft: 15 }
            }
          />
          {authForm === "login" && <EmailIcon className={styles.emailIcon} />}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required="required"
            onChange={onChange}
            maxLength={35}
            style={
              authForm === "login" ? { paddingLeft: 35 } : { paddingLeft: 15 }
            }
          />
          {authForm === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              required="required"
              onChange={onChange}
              maxLength={35}
              style={{ paddingLeft: 15 }}
            />
          )}
          {authForm === "login" && <LockIcon className={styles.lockIcon} />}
          <input
            type="submit"
            value={authForm === "login" ? "LOGIN" : "REGISTER"}
            className={styles.btnGray}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {authForm === "login" ? (
              <Fragment>
                <p className={styles.bodyText}>New user?</p>

                <div
                  className={styles.signUp}
                  onClick={() => setForm("register")}
                >
                  Sign up
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div>
                  <p className={styles.bodyText}> Already have an account?</p>
                </div>
                <div className={styles.signUp} onClick={() => setForm("login")}>
                  Sign in
                </div>
              </Fragment>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
