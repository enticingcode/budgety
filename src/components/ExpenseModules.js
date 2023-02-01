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
        <img
          onClick={deleteExpense}
          className="closeOut"
          src="/xout.png"
          alt="Delete"
        />
      </div>
    );
  });

  return (
    <>
      <div className="in-headers">
        <h2>Monthly Expenses</h2>
        <form className="form-inp" onSubmit={addExpense}>
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
          <button className="input-btn">Add</button>
        </form>
        <div className="fin-container">{expenseElements}</div>
      </div>
    </>
  );
}

export default ExpenseModules;
