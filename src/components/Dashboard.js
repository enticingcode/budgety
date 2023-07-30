import React from "react";
import ChartModule from "./ChartModule";
import { db } from "../authFiles/FirebaseAuth";
import { getDoc, doc } from "firebase/firestore";
import CashFlowModule from "./CashFlowModule";
import "../styles/dashboard.css";
// import TopOffenders from "./TopOffenders";
import { useSelector, useDispatch, batch } from "react-redux";
import { changeActiveStatus } from "../features/utilities/modalSlice";
import {
  saveIncomeData,
  saveExpenseData,
  saveSavingsData,
} from "../features/financials/financeSlice";
import TopOffenders from "./TopOffenders";

const Dashboard = (props) => {
  // console.log('Dashboard Render');
  const dispatch = useDispatch();
  const [user, setUser] = React.useState();

  const auth = props.auth.uid;
  
  // console.log("Dashboard auth: ", auth);
  // =========================================== //

  // USE SELECTOR CAUSES 3 RE-RENDERS WITH USEREACT, NEED TO FIGURE OUT A WAY OUT OF THIS.


  // CashFlowStates can be passed down as props to prevent further renders
  const cashFlowStates = useSelector((state) => state.finance);

  let incomeArr = cashFlowStates.incomeArr;
  let expenseArr = cashFlowStates.expenseArr;
  let savingsArr = cashFlowStates.savingsArr;

  // Sum of total finances
  let totalIncome = incomeArr.map((item) => {
    return item.amount;
  });

  let totalExpenses = expenseArr.map((item) => {
    return item.amount;
  });

  let totalSavings = savingsArr.map((item) => {
    return item.amount;
  });


  let remainingMonthly = addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);


 

  // Add values of filtered array to display;
  function addValues(arr) {
    let final;

    // console.log(arr);
    if (arr.length === 0) return 0;
    if (arr.length === 1) return parseInt(arr[0]);

    if (arr.length > 1) {
      final = arr.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    }
    return final;
  }

  // let remaining = addValues(totalIncome) - addValues(totalExpenses);

  // console.log(remainingMonthly);

  /////////////////////////////////
  // PULL IN DATA FROM FIREBASE //
  ///////////////////////////////
  async function getData() {
    const userCollectionRef = doc(db, "users", auth);
    const document = await getDoc(userCollectionRef);

    if (document.data()) {
      const incomesData = document.data().Income;
      const expensesData = document.data().Expenses;
      const savingsAlloData = document.data().Savings;

      // SET STATES //

      batch(() => {
        if (incomesData) dispatch(saveIncomeData(incomesData));
        if (expensesData) dispatch(saveExpenseData(expensesData));
        if (savingsAlloData) dispatch(saveSavingsData(savingsAlloData));
      });
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <main className="dashboard">
      <section className="top-section">
        <div className="current-bal">
          <p>Monthly Remaining</p>
          <p>{remainingMonthly}</p>
        </div>

        <div className="goals-container"></div>

        <button
          className="new-entry"
          onClick={() => dispatch(changeActiveStatus(true))}
        >
          Manage
        </button>
        {/* <button className="new-entry" onClick={handleClick}>Manage</button> */}
      </section>

      <section className="middle-section">
        <h2>Highest Offenders</h2> 
         <TopOffenders cashFlow={cashFlowStates} /> 
      </section>

      <section className="financials-section">
        <CashFlowModule cashFlow={incomeArr} moduleName="Income" />

        <CashFlowModule cashFlow={expenseArr} moduleName="Expenses" />

        <CashFlowModule cashFlow={savingsArr} moduleName="Savings" />
      </section>
    </main>
  );
};

export default Dashboard;

// <section class="charts-container">
//   <div className="chart-box">
//     <h2>Expense Tracker</h2>
//     <ChartModule stateNames={expenses} chartData={totalExpenses} />

//     {/* CASH FLOW INFORMATION */}
//     <h4 className="">Total Income: ${addValues(totalIncome)}</h4>
//     <h4 className="text-danger">
//       Total Expenses: ${addValues(totalExpenses)}
//     </h4>
//     <h4 className="text-success">
//       Remaining: ${remainingAfterSavings || remaining || ""}
//     </h4>
//   </div>
//   <div className="chart-box w-25 text-center">
//     <h2>Savings Allocation</h2>
//     <ChartModule
//       stateNames={savingsAllocation}
//       chartData={totalSavings}
//     />
//     Total Allocated: ${addValues(totalSavings)}
//   </div>
//   </section>
