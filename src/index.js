import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/auth";
import RouteSwitch from "./RouteSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <RouteSwitch />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
