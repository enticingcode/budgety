import React from "react";
import uniqid from "uniqid";
import LabelRename from "./LabelRename";

function ExpenseModules(props) {
  const { expenses, setExpenses } = props;

  function addExpense(e) {
    e.preventDefault();
    setExpenses((prev) => {
      console.log(prev);
      return [...prev, { name: "New Expense", expense: "", id: uniqid() }];
    });
  }

  // this is where i have to decide if I want to label expenses by numbers or keep them empty, mabe inplement naming of input labels instead,
  // save trouble on numbering cluster logic?

  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;

    if (isNaN(value)) return;
    // get id of node target, and compare to expense state array.
    //iterate through array and check every object for matching id.
    //if id matches, update object expense to the value of the target

    setExpenses((prev) => {
      return prev.map((obj) => {
        if (obj.id === nodeTarget) {
          return { ...obj, expense: value };
        }
        return obj;
      });
    });
  }

  let expensePrompts = expenses.map((item) => {
    return (
      <div className="expense-item" key={item.id}>
        {/* this label has to be editable component */}
        <LabelRename
          category={expenses}
          stateSetter={setExpenses}
          name={item.name}
          htmlFor={item.id}
        />
        <input
          onChange={handleChange}
          id={item.id}
          value={item.expense}
          name={item.name}
          className="expense-input"
        ></input>
      </div>
    );
  });

  return (
    <div className="expense-container">
      <h2>Monthly Expenses</h2>
      {expensePrompts}
      <button onClick={addExpense}>Add Expense</button>
    </div>
  );
}

export default ExpenseModules;
