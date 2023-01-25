import React from "react";
import { useAuth } from "./auth";
import IncomeModules from "./IncomeModules";
import ExpenseModules from "./ExpenseModules";
import SavingsModules from "./SavingsModules";
import ChartModule from "./ChartModule";
import { db } from "./FirebaseAuth";
import { updateMoneyValues } from "./FirebaseAuth";
import { getDoc, doc } from "firebase/firestore";

const Dashboard = () => {
  const localAuth = useAuth();
  const userCollectionRef = doc(db, "users", localAuth.user);

  //pull to ui on initial load, and save to local storage.

  // when add new income add to local storage, check for local storage changes to upload.
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

  let remaining = addValues(totalIncome) - addValues(totalExpenses);

  let remainingAfterSavings =
    addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);

  /////////////////////////////////
  // PULL IN DATA FROM FIREBASE //
  ///////////////////////////////

  async function getData() {
    const doc = await getDoc(userCollectionRef);

    const incomesData = doc.data().incomeSources;
    // const expensesData = doc.data().expenses;
    // const savingsData = doc.data().savingsAllocation;

    // SET STATES //
    if (incomesData.length > 0) {
      setIncomeSources(incomesData);
    }
    // if (expensesData.length > 0) {
    //   setExpenses(expensesData);
    // }
    // if (savingsData.length > 0) {
    //   setSavingsAllocation(savingsData);
    // }
  }

  React.useEffect(() => {
    getData();
  }, []);

  /////////////////////////////////
  // UPLOAD CHANGES TO FIREBASE //
  ///////////////////////////////
  console.log(incomeSources);

  return (
    <>
      {/* should be state considering its an api call  upon login*/}

      <h1 className="ms-3 mt-4">Welcome {localAuth.personName} </h1>

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
          Total Allocated: ${addValues(totalSavings)}
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
    </>
  );
};

export default Dashboard;
