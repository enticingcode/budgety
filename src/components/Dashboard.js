import React from "react";
import { useAuth } from "./auth";
import ChartModule from "./ChartModule";
import { db } from "./FirebaseAuth";
import { getDoc, doc } from "firebase/firestore";
import ModuleInputs from "./ModuleInputs";
import InputModal from "./InputModal";
import "../styles/dashboard.css";
import TopOffenders from "./TopOffenders";
import { useSelector, useDispatch } from "react-redux";
import { incomeTest } from "../features/financials/incomeSlice"
import { expenseTest } from "../features/financials/expenseSlice"


const Dashboard = () => {
  const localAuth = useAuth();
  const userCollectionRef = doc(db, "users", localAuth.user);
  const [user, setUser] = React.useState();

  const dispatch = useDispatch();

  const incomeArr = useSelector((state) => state.income.value);
  const expense = useSelector((state) => state.expense.value);

  console.log(incomeArr);
  console.log(expense);

  // console.log('render')

  function handleClick() {
    // dispatch(incomeTest())
    dispatch(expenseTest())
  }


  const [isModalActive, setIsModalActive] = React.useState(false);

  // const [incomeSources, setIncomeSources] = React.useState([]);

  const [expenses, setExpenses] = React.useState([]);

  const [savingsAllocation, setSavingsAllocation] = React.useState([]);

  let totalIncome = incomeArr.map((item) => {
    return item.amount;
  });

  let totalExpenses = expenses.map((item) => {
    return item.amount;
  });

  let totalSavings = savingsAllocation.map((item) => {
    return item.amount;
  });

  function toggleModal(e) {
    setIsModalActive((prev) => {
      return !prev;
    });
  }

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

  // async function getData() {
  //   const doc = await getDoc(userCollectionRef);

  //   if (doc.data()) {
  //     let name = doc.data().name;
  //     const incomesData = doc.data().Income;
  //     const expensesData = doc.data().Expenses;
  //     const savingsAlloData = doc.data().Savings;

  //     setUser(name);

  //     // SET STATES //
  //     if (incomesData) {
  //       setIncomeSources(incomesData);
  //     }
  //     if (expensesData) {
  //       setExpenses(expensesData);
  //     }
  //     if (savingsAlloData) {
  //       setSavingsAllocation(savingsAlloData);
  //     }
  //   }
  // }

  // React.useEffect(() => {
  //   // getData();
  // }, []);

  // console.log(isModalActive);


  return (
    <>
      {/* INCOME-EXPENSE MODULE */}
      {isModalActive && (
        <InputModal
          toggleModal={toggleModal}
          // setIncomeSources={setIncomeSources}
          setExpenses={setExpenses}
          setSavingsAllocation={setSavingsAllocation}
        />
      )}

      <section className="top-section">
        <div className="current-bal">
          <p>Current Balance</p>
          <p>$7,305</p>
        </div>

        <div className="goals-container">
        </div>

        {/* <button className="new-entry" onClick={toggleModal}>Manage</button> */}
        <button className="new-entry" onClick={handleClick}>Manage</button>
      </section>

      <section className="middle-section top-offenders">
      <TopOffenders expenses={expenses} />
      </section>

      <section className="financials-section">
        <ModuleInputs
          cashFlow={incomeArr}
          // cashFlow={incomeSources}
          // setCashFlow={setIncomeSources}
          moduleName="Income"
        />

        <ModuleInputs
          cashFlow={expenses}
          setCashFlow={setExpenses}
          moduleName="Expenses"
        />

        <ModuleInputs
          cashFlow={savingsAllocation}
          setCashFlow={setSavingsAllocation}
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
