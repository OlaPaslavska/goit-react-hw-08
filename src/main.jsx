import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";
import { refreshUser } from "./redux/auth/operations";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(refreshUser());

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
