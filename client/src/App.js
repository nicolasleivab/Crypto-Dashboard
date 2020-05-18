import React from "react";
import AuthState from "./context/auth/AuthState";
import ModalState from "./context/modal/ModalState";
import AllcoinsState from "./context/allcoins/AllcoinsState";
import UsercoinsState from "./context/usercoins/UsercoinsState";
import AlertState from "./context/alert/AlertState";
import Home from "./pages/Home";

function App() {
  return (
    <AuthState>
      <ModalState>
        <AllcoinsState>
          <UsercoinsState>
            <AlertState>
              <Home />
            </AlertState>
          </UsercoinsState>
        </AllcoinsState>
      </ModalState>
    </AuthState>
  );
}

export default App;
