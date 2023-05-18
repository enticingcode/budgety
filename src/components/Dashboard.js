import React from "react";
import { useAuth } from "./auth";
import ChartModule from "./ChartModule";
import { db } from "./FirebaseAuth";
import { getDoc, doc } from "firebase/firestore";
import CashFlowModule from "./CashFlowModule";
import "../styles/dashboard.css";
import TopOffenders from "./TopOffenders";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveStatus } from "../features/utilities/modalSlice";
import { saveIncomeData, saveExpenseData } from "../features/financials/financeSlice";


const Dashboard = () => {
  console.log('Dashboard Render');
  const dispatch = useDispatch();
  const localAuth = useAuth();
  const userCollectionRef = doc(db, "users", localAuth.user);
  const [user, setUser] = React.useState();
  
  // =========================================== //

  // USE SELECTOR CAUSES 3 RE-RENDERS WITH USEREACT, NEED TO FIGURE OUT A WAY OUT OF THIS.

 const cashFlowStates = useSelector((state) => state.finance);

//  console.log(cashFlowStates);


  let incomeArr = cashFlowStates.incomeArr;
  let expenseArr = cashFlowStates.expenseArr;
  let savingsArr = cashFlowStates.savingsArr;

  // console.log("income: ", incomeArr, "\n", "expense: ", expenseArr, "\n", "savings: ", savingsArr);


  // Sum of total finances //
  let totalIncome = incomeArr.map((item) => {
    return item.amount;
  });

  let totalExpenses = expenseArr.map((item) => {
    return item.amount;
  });

  // let totalSavings = savingsAllocation.map((item) => {
  //   return item.amount;
  // });




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

  // let remaining = addValues(totalIncome) - addValues(totalExpenses);

  // let remainingAfterSavings =
  //   addValues(totalIncome) - addValues(totalExpenses) - addValues(totalSavings);

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

      // SET STATES //
      if (incomesData) {
        dispatch(saveIncomeData(incomesData));
      }
      if (expensesData) {
        dispatch(saveExpenseData(expensesData));
      }
      // if (savingsAlloData) {
      //   setSavingsAllocation(savingsAlloData);
      // }
    }
  }

  React.useEffect(() => {
    getData();
  }, []);



  return (
    <>
      <section className="top-section">
        <div className="current-bal">
          <p>Current Balance</p>
          <p>$7,305</p>
        </div>

        <div className="goals-container">
        </div>

        <button className="new-entry" onClick={() => dispatch(changeActiveStatus(true))}>Manage</button>
        {/* <button className="new-entry" onClick={handleClick}>Manage</button> */}
      </section>

      <section className="middle-section top-offenders">
      {/* <TopOffenders /> */}
      </section>

      <section className="financials-section">
        <CashFlowModule
          cashFlow={incomeArr}
          moduleName="Income"
        />

        <CashFlowModule
          cashFlow={expenseArr}
          moduleName="Expenses"
        />

        <CashFlowModule
          cashFlow={savingsArr}
          moduleName="Savings"
        />
      </section>
    </>
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
