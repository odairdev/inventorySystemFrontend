import { Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth";
import { CrudContextProvider } from "./contexts/crud";
import Modal from "react-modal";

import { Routes } from "./routes";
import history from "./routes/history";
import { ModalContextProvider } from "./contexts/ModalContext";

Modal.setAppElement("#root");

function App() {
  return (
    <AuthContextProvider>
      <CrudContextProvider>
        <ModalContextProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </ModalContextProvider>
      </CrudContextProvider>
    </AuthContextProvider>
  );
}

export default App;
