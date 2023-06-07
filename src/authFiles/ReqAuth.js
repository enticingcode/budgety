import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const ReqAuth = ({ children }) => {
  let auth = useAuth();
  if (null) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ReqAuth;


// I have no fucking clue what I'm doing at this point, screw this please.