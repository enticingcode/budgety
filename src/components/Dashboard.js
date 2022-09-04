import React from "react";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";

const Dashboard = () => {
  const auth = useAuth();

  //Dashboard is going to have many individual components to function it.

  return (
    <div className="dash">
      <h1>Welcome {auth.user}</h1>
      <IncomeModules />
    </div>
  );
};

export default Dashboard;
