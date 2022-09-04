import React from "react";
import { useAuth } from "./auth";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div>
      this is the dashboard
      <p>{auth.msg}</p>
    </div>
  );
};

export default Dashboard;
