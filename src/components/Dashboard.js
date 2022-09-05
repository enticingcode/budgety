import React from "react";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";
import ExpenseModules from "./ExpenseModules";
import SavingsModules from "./SavingsModules";
import "../styles/Dashboard.css";
import ChartModule from "./ChartModule";

const Dashboard = () => {
  const [incomeSources, setIncomeSources] = React.useState([
    { income: "", id: uniqid() },
    { income: "", id: uniqid() },
  ]);
  const auth = useAuth();

  //Dashboard is going to have many individual components to function it.
  // state of modules will most likely have to be put here.

  // console.log(incomeSources);

  return (
    <div className="dash">
      <h1>Welcome {auth.user}</h1>

      <div className="budget-app">
        <div className="chart-container">
          <ChartModule incomeSources={incomeSources} />
        </div>
        <div className="input-containers">
          <IncomeModules
            incomeSources={incomeSources}
            setIncomeSources={setIncomeSources}
          />
          <ExpenseModules />
          {/* <SavingsModules /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
