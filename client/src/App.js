import React from "react";
import NavBar from "./components/layout/NavBar";
import AuthState from "./context/auth/AuthState";
import styles from "./App.module.css";

function App() {
  return (
    <AuthState>
      <div className={styles.App}>
        <NavBar />
      </div>
    </AuthState>
  );
}

export default App;
