import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/FirebaseAuth"

const ReqAuth = ({ children }) => {

  if (!auth.currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ReqAuth;
