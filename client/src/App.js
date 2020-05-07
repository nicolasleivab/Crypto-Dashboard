import React from "react";
import AuthState from "./context/auth/AuthState";
import ModalState from "./context/modal/ModalState";
import Home from "./pages/Home";

function App() {
  return (
    <AuthState>
      <ModalState>
        <Home />
      </ModalState>
    </AuthState>
  );
}

export default App;
