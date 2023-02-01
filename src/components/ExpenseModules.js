import React from "react";
import uniqid from "uniqid";
import { updateFirebaseValues } from "./FirebaseAuth";
import { useAuth } from "./auth";

function ExpenseModules(props) {
  const { expenses, setExpenses } = props;
  const localAuth = useAuth();

  const [expenseInput, setExpenseInput] = React.useState({
    expenseName: "",
    amount: "",
  });

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;

    setExpenseInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addExpense(e) {
    e.preventDefault();
    if (expenses.length > 50)
      return alert(
        "Maximum limit reached for safety reasons, maybe try not spending so much? :) haha"
      );
    let newExpenseObj = {
      name: expenseInput.expenseName,
      expense: expenseInput.amount,
      id: uniqid(),
    };

    setExpenses((prev) => {
      return [...prev, newExpenseObj];
    });

    updateFirebaseValues(localAuth.user, "expenses", newExpenseObj, "add");
    setExpenseInput({ expenseName: "", amount: "" });
  }

  function deleteExpense(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;

    let newArr = expenses.filter((item) => {
      return item.id !== elementID;
    });

    setExpenses(newArr);
    updateFirebaseValues(localAuth.user, "expenses", newArr, "del");
  }

  let expenseElements = expenses.map((item) => {
    return (
      <div className="input-item" key={item.id} id={item.id}>
        <p className="money-info">
          {item.name}: ${item.expense}
        </p>
        <button onClick={deleteExpense} className="trash-ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="in-headers my-3">
        <h2>Monthly Expenses</h2>
        <form
          className="form-inp d-flex align-items-center justify-content-center"
          onSubmit={addExpense}
        >
          <input
            onChange={handleChange}
            name="expenseName"
            value={expenseInput.expenseName}
            className="input-box"
            placeholder="Expense name"
            required
          ></input>
          <input
            onChange={handleChange}
            name="amount"
            value={expenseInput.amount}
            className="input-box"
            placeholder="$ Amount"
            required
          ></input>
          <button className="input-btn btn btn-success">Add Expense</button>
        </form>
        <div className="fin-container">{expenseElements}</div>
      </div>
    </>
  );
}

export default ExpenseModules;
