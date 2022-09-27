import React from "react";
import uniqid from "uniqid";
import LabelRename from "./LabelRename";

function ExpenseModules(props) {
  const { expenses, setExpenses } = props;

  const [expenseInput, setExpenseInput] = React.useState({
    expenseName: "",
    amount: "",
  });

  function addExpense(e) {
    e.preventDefault();
    if (expenses.length > 31) return alert("Maximum limit reached");

    setExpenses((prev) => {
      return [
        ...prev,
        {
          name: expenseInput.expenseName,
          expense: expenseInput.amount,
          id: uniqid(),
        },
      ];
    });
  }

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    setExpenseInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  console.log(expenseInput);
  console.log(expenses);

  let expenseElements = expenses.map((item) => {
    return (
      <div className="input-item" key={item.id}>
        {/* <LabelRename
          category={expenses}
          stateSetter={setExpenses}
          name={item.name}
          htmlFor={item.id}
        /> */}
        <div>
          <p>{item.expense}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="in-headers my-3">
        <h2>Monthly Expenses</h2>
        <input
          onChange={handleChange}
          name="expenseName"
          className="input-box"
          placeholder="Expense name"
          required
        ></input>
        <input
          onChange={handleChange}
          name="amount"
          className="input-box"
          placeholder="$ Amount"
          required
        ></input>
        <button className="btn btn-success" onClick={addExpense}>
          Add Expense
        </button>
        {expenseElements}
      </div>
    </>
  );
}

export default ExpenseModules;

// setExpenses((prev) => {
//   return prev.map((obj) => {
//     if (obj.id === nodeTarget) {
//       return { ...obj, expense: value };
//     }
//     return obj;
//   });
// })
