import React from "react";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";
import ExpenseModules from "./ExpenseModules";
import SavingsModules from "./SavingsModules";
import ChartModule from "./ChartModule";
import CPIData from "./CPIData";
import BuyingPowerAPI from "./BuyingPowerAPI";

const Dashboard = () => {
  const refAuth = useAuth();

  const [incomeSources, setIncomeSources] = React.useState([
    { income: "1000", id: uniqid() },
    { income: "", id: uniqid() },
  ]);

  const [expenses, setExpenses] = React.useState([
    { name: "Rent", expense: "500", id: uniqid() },
    { name: "Utilities", expense: "", id: uniqid() },
    { name: "Phone", expense: "", id: uniqid() },
    { name: "Gas", expense: "", id: uniqid() },
    { name: "Food", expense: "", id: uniqid() },
  ]);

  const [savingsAllocation, setSavingsAllocation] = React.useState([
    { name: "401k", allocation: "200", id: uniqid() },
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

  //Dashboard is going to have many individual components to function it.
  // state of modules will most likely have to be put here.

  let remaining = addValues(totalIncome) - addValues(totalExpenses);

  let remainingAfterSavings =
    addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);

  return (
    <div className="d-flex flex-column ">
      {/* should be state considering its an api call  upon login*/}

      <h1 className="ms-3 mt-5">Welcome {refAuth.personName} </h1>

      {/* informational modules */}
      <div className="d-md-flex">
        <section className="module d-flex flex-grow-1 justify-content-around m-3 rounded bg-light">
          <div className="">
            <h2 className="">Track your Income and Expenses Easily!</h2>
            <ul className="">
              <li>Add custom named expenses & allocations</li>
              <li>Experience infographic chart provided by ChartJS</li>
              <li>Get inflation information from sourced API</li>
            </ul>
          </div>
        </section>
        <section className="module d-flex flex-grow-1 justify-content-around m-3 rounded bg-light">
          <div className="ext-info">
            <h2 className="text-blue-500 text-2xl">Features coming soon:</h2>
            <ul className="functionality-list">
              <li>Financial goal planning</li>
              <li>Monthly Budget Tracking</li>
              <li>Transactions Tracking</li>
              <li>iOS application</li>
            </ul>
          </div>
        </section>
        <section className="module d-flex flex-grow-1 justify-content-around m-3 rounded bg-light">
          <div className="ext-info">
            <h2 className="text-blue-500 text-2xl">Have any suggestions? </h2>
            <p>Please feel free to reach out to us</p>
            <a href="mialto:trujillomarvin@hotmail.com">Email</a>
          </div>
        </section>
      </div>

      {/* INCOME-EXPENSE MODULE */}
      <section className="module d-md-flex justify-content-start m-3 rounded bg-light">
        <div className="w-25 text-center">
          <h2>Expense Tracker</h2>
          <ChartModule
            type={"Pie"}
            stateNames={expenses}
            chartData={totalExpenses}
          />
          <h4>Total Income: ${addValues(totalIncome)}</h4>
          <h4>Total Expenses: ${addValues(totalExpenses)}</h4>
          <h4>Remaining: ${remainingAfterSavings || remaining || ""}</h4>
        </div>

        <div className="d-flex flex-column w-100 ms-5">
          <div className="in-headers my-3">
            <h2>Monthly Incomes</h2>
            <div className="d-flex justify-content-center flex-wrap">
              <IncomeModules
                incomeSources={incomeSources}
                setIncomeSources={setIncomeSources}
              />
            </div>
          </div>
          <div className="in-headers my-3">
            <h2>Monthly Expenses</h2>
            <ExpenseModules expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      </section>

      {/* SAVINGS MODULE */}
      <section className="module d-flex m-3 text-center rounded bg-light">
        <div className="w-25 text-center">
          <h2>Savings Allocation</h2>
          <ChartModule
            stateNames={savingsAllocation}
            chartData={totalSavings}
          />
        </div>
        <div className=" w-100 ms-5">
          <div className="in-headers">
            <h2>Allocations</h2>
            <SavingsModules
              savingsAllocation={savingsAllocation}
              setSavingsAllocation={setSavingsAllocation}
            />
          </div>
        </div>
      </section>

      {/* FUN MONEY MODULE */}
      <section className="module d-flex flex-column m-3 rounded bg-light">
        <h2>Financial Forecast</h2>

        <div className="d-flex align-items-start cpi-data">
          <BuyingPowerAPI />
          <CPIData />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
