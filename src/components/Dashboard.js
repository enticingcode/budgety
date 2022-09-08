import React from "react";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";
import ExpenseModules from "./ExpenseModules";
import SavingsModules from "./SavingsModules";
import "../styles/Dashboard.css";
import ChartModule from "./ChartModule";
import InflationAPI from "./InflationAPI";

// important note.
// Savings allocation is dependent on free cash flow.
// figure out implementation

const Dashboard = () => {
  const refAuth = useAuth();

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

  const [savingsAllocation, setSavingsAllocation] = React.useState([
    { name: "401k", allocation: "", id: uniqid() },
    { name: "Roth", allocation: "", id: uniqid() },
    { name: "Rainy Day Fund", allocation: "", id: uniqid() },
    { name: "Future Car", allocation: "", id: uniqid() },
  ]);

  let totalIncome = incomeSources.map((item) => {
    return item.income;
  });

  let totalExpenses = expenses.map((item) => {
    return item.expense;
  });

  let totalSavings = savingsAllocation.map((item) => {
    return item.allocation;
  });

  // Add values of filtered array to display;
  function addValues(arr) {
    let final;
    let newArr = arr.filter((item) => parseInt(item));

    if (newArr.length === 1) return parseInt(newArr[0]);

    if (newArr.length > 1) {
      final = newArr.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    }
    return final;
  }

  console.log(addValues(totalExpenses));

  //Dashboard is going to have many individual components to function it.
  // state of modules will most likely have to be put here.

  let remaining = addValues(totalIncome) - addValues(totalExpenses);

  let remainingAfterSavings =
    addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);

  return (
    <div className="dash">
      <h1>Welcome {refAuth.user}</h1>

      {/* INCOME-EXPENSE MODULE */}
      <section className="cashFlow module">
        <div className="chart-container expenses">
          <h2>Expense Tracker</h2>
          <ChartModule
            type={"Pie"}
            stateNames={expenses}
            chartData={totalExpenses}
          />
          <h2>Total Income: ${addValues(totalIncome)}</h2>
          <h2>Total Expenses: ${addValues(totalExpenses)}</h2>
          <h2>Remaining: ${remainingAfterSavings || remaining || ""}</h2>
        </div>

        <div className="input-containers">
          <IncomeModules
            incomeSources={incomeSources}
            setIncomeSources={setIncomeSources}
          />
          <ExpenseModules expenses={expenses} setExpenses={setExpenses} />
        </div>
        <div className="ext-info">
          <InflationAPI />
        </div>
      </section>

      {/* SAVINGS MODULE */}
      <section className="savings module">
        <div className="chart-container">
          <h2>Savings Allocation</h2>
          <ChartModule
            stateNames={savingsAllocation}
            chartData={totalSavings}
          />
        </div>
        <SavingsModules
          savingsAllocation={savingsAllocation}
          setSavingsAllocation={setSavingsAllocation}
        />
      </section>

      {/* FUN MONEY MODULE */}
      <section className="fun-money module">
        <h2>Fun Money</h2>
        <p> ${remainingAfterSavings}</p>
      </section>
    </div>
  );
};

export default Dashboard;
