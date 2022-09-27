import React from "react";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";
import ExpenseModules from "./ExpenseModules";
import SavingsModules from "./SavingsModules";
import ChartModule from "./ChartModule";
import { updateMoneyValues } from "./FirebaseAuth";

// saved data to localStorage for now, need implementation which isn't so taxing on re-rendering,
// just got lazy right now
// more worried UI/UX wise right now.
// (which i know data being consistent accross devices is a huge UX thing but i mean presentation wise)

const Dashboard = () => {
  const localAuth = useAuth();

  const [incomeSources, setIncomeSources] = React.useState([]);

  const [expenses, setExpenses] = React.useState([]);

  const [savingsAllocation, setSavingsAllocation] = React.useState([]);

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

  console.log(incomeSources, expenses);
  //Dashboard is going to have many individual components to function it.
  // state of modules will most likely have to be put here.

  let remaining = addValues(totalIncome) - addValues(totalExpenses);

  let remainingAfterSavings =
    addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);

  React.useEffect(() => {
    updateMoneyValues(localAuth.user, incomeSources, "income");
    // updateMoneyValues(localAuth.user, expenses, expenses)
  }, []);

  return (
    <div className="d-flex flex-column ">
      {/* should be state considering its an api call  upon login*/}

      <h1 className="ms-3 mt-5">Welcome {localAuth.personName} </h1>

      {/* informational modules */}
      <div className="d-md-flex">
        <section className="module d-flex flex-grow-1 justify-content-around m-3">
          <div className="ext-info">
            <h2 className="text-blue-500 text-2xl">Features coming soon:</h2>
            <ul className="functionality-list">
              <li>Financial goal planning</li>
              <li>Monthly Budget Tracking</li>
              <li>Transactions Tracking</li>
              <li>iOS application</li>
            </ul>
          </div>

          <div className="ext-info">
            <h2 className="text-blue-500 text-2xl">Have any suggestions? </h2>
            <p>Please feel free to reach out to us</p>
            <a href="mialto:trujillomarvin@hotmail.com">Email</a>
          </div>
        </section>
      </div>

      {/* INCOME-EXPENSE MODULE */}
      <section className="module d-md-flex justify-content-start m-3 rounded">
        <div className="chart-box w-25 text-center">
          <h2>Expense Tracker</h2>
          <ChartModule
            type={"Pie"}
            stateNames={expenses}
            chartData={totalExpenses}
          />
          <h4 className="">Total Income: ${addValues(totalIncome)}</h4>
          <h4 className="text-danger">
            Total Expenses: ${addValues(totalExpenses)}
          </h4>
          <h4 className="text-success">
            Remaining: ${remainingAfterSavings || remaining || ""}
          </h4>
        </div>

        <div className="d-flex flex-column w-100 ms-5">
          <IncomeModules
            incomeSources={incomeSources}
            setIncomeSources={setIncomeSources}
          />
          <ExpenseModules expenses={expenses} setExpenses={setExpenses} />
        </div>
      </section>

      {/* SAVINGS MODULE */}
      <section className="module d-flex m-3 text-center rounded">
        <div className="chart-box w-25 text-center">
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
    </div>
  );
};

export default Dashboard;
