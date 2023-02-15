import React from "react";
import { useAuth } from "./auth";
import ChartModule from "./ChartModule";
import { db } from "./FirebaseAuth";
import { getDoc, doc } from "firebase/firestore";
import ModuleInputs from "./ModuleInputs";

const Dashboard = () => {
  const localAuth = useAuth();
  const userCollectionRef = doc(db, "users", localAuth.user);
  const [user, setUser] = React.useState();

  console.log("render");
  //pull to ui on initial load, and save to local storage.

  // when add new income add to local storage, check for local storage changes to upload.
  const [incomeSources, setIncomeSources] = React.useState([]);

  const [expenses, setExpenses] = React.useState([]);

  const [savingsAllocation, setSavingsAllocation] = React.useState([]);

  let totalIncome = incomeSources.map((item) => {
    return item.amount;
  });

  let totalExpenses = expenses.map((item) => {
    return item.amount;
  });

  let totalSavings = savingsAllocation.map((item) => {
    return item.amount;
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

    if (doc.data()) {
      let name = doc.data().name;
      const incomesData = doc.data().Income;
      const expensesData = doc.data().Expenses;
      const savingsAlloData = doc.data().Savings;

      setUser(name);

      console.log(incomesData);

      // SET STATES //
      if (incomesData) {
        setIncomeSources(incomesData);
      }
      if (expensesData) {
        setExpenses(expensesData);
      }
      if (savingsAlloData) {
        setSavingsAllocation(savingsAlloData);
      }
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* should be state considering its an api call  upon login*/}

      <h1 className="welcomeh1">Welcome {localAuth.personName} </h1>

      {/* informational modules */}
      {/* <div className="d-md-flex">
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
      </div> */}

      {/* INCOME-EXPENSE MODULE */}
      <section className="module d-flex justify-content-evenly">
        <ModuleInputs
          cashFlow={incomeSources}
          setCashFlow={setIncomeSources}
          moduleName="Income"
        />
        <ModuleInputs
          cashFlow={expenses}
          setCashFlow={setExpenses}
          moduleName="Expenses"
        />

        <div className="chart-box">
          <h2>Expense Tracker</h2>
          <ChartModule stateNames={expenses} chartData={totalExpenses} />

          {/* CASH FLOW INFORMATION */}
          <h4 className="">Total Income: ${addValues(totalIncome)}</h4>
          <h4 className="text-danger">
            Total Expenses: ${addValues(totalExpenses)}
          </h4>
          <h4 className="text-success">
            Remaining: ${remainingAfterSavings || remaining || ""}
          </h4>
        </div>
      </section>

      {/* SAVINGS MODULE */}
      <section className="module d-flex justify-content-center" >
        <div className=" w-100 ">
          <div className="in-headers">
            <ModuleInputs
              cashFlow={savingsAllocation}
              setCashFlow={setSavingsAllocation}
              moduleName="Savings"
            />
          </div>
        </div>
        <div className="chart-box w-25 text-center">
          <h2>Savings Allocation</h2>
          <ChartModule
            stateNames={savingsAllocation}
            chartData={totalSavings}
          />
          Total Allocated: ${addValues(totalSavings)}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
