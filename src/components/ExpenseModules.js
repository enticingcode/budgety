import React from "react";
import uniqid from "uniqid";
import LabelRename from "./LabelRename";

function ExpenseModules() {
  const [expenses, setExpenses] = React.useState([
    { name: "Rent", expense: "", id: uniqid(), num: 1 },
    { name: "Utilities", expense: "", id: uniqid(), num: 2 },
    { name: "Phone", expense: "", id: uniqid(), num: 3 },
    { name: "Gas", expense: "", id: uniqid(), num: 4 },
    { name: "Food", expense: "", id: uniqid(), num: 5 },
  ]);

  function addExpense(e) {
    e.preventDefault();
    setExpenses((prev) => {
      console.log(prev);
      return [...prev, { expense: "", id: uniqid(), num: prev[0].num + 1 }];
    });
  }

  // this is where i have to decide if I want to label expenses by numbers or keep them empty, mabe inplement naming of input labels instead,
  // save trouble on numbering cluster logic?

  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;
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

  // console.log(expenses);

  let expensePrompts = expenses.map((item) => {
    return (
      <div className="expense-item" key={item.id}>
        {/* this label has to be editable component */}
        <LabelRename
          expenses={expenses}
          setExpenses={setExpenses}
          name={item.name}
          htmlFor={item.id}
        />
        {/* <label htmlFor={item.id}>{item.name}</label> */}
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
      {expensePrompts}
      {/* <button onClick={addExpense}>Add Expense</button> */}
    </div>
  );
}

export default ExpenseModules;
