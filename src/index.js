import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/auth";
import RouteSwitch from "./RouteSwitch";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouteSwitch />
    </AuthProvider>
  </React.StrictMode>
);
