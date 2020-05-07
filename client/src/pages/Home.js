import React, { useContext, useEffect } from "react";
import NavBar from "../components/layout/NavBar";
import AuthForm from "../components/AuthForm/AuthForm";
import AuthContext from "../context/auth/authContext";
import ModalContext from "../context/modal/modalContext";
import styles from "./Home.module.css";

function Home() {
  const authtContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const { isAuthenticated, loadUser } = authtContext;
  const { hideModal, setModal, modal } = modalContext;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      hideModal();
    } else {
      setModal();
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.Home}>
      <div className={modal && styles.blurMode}>
        <NavBar />
      </div>
      {modal && <AuthForm />}
    </div>
  );
}

export default Home;
