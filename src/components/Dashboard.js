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

  const [expenses, setExpenses] = React.useState([
    { name: "Rent", expense: "", id: uniqid() },
    { name: "Utilities", expense: "", id: uniqid() },
    { name: "Phone", expense: "", id: uniqid() },
    { name: "Gas", expense: "", id: uniqid() },
    { name: "Food", expense: "", id: uniqid() },
  ]);

  const auth = useAuth();

  console.log(expenses);

  //Dashboard is going to have many individual components to function it.
  // state of modules will most likely have to be put here.

  // console.log(incomeSources);

  return (
    <div className="dash">
      <h1>Welcome {auth.user}</h1>

      <div className="budget-app">
        <div className="chart-container">
          <h2>Expense Tracker</h2>
          <ChartModule incomeSources={incomeSources} expenses={expenses} />
        </div>
        <div className="input-containers">
          <IncomeModules
            incomeSources={incomeSources}
            setIncomeSources={setIncomeSources}
          />
          <ExpenseModules expenses={expenses} setExpenses={setExpenses} />
          {/* <SavingsModules /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
