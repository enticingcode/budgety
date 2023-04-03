import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/auth";
import RouteSwitch from "./RouteSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider>
        <RouteSwitch />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
