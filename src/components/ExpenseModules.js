import React from "react";
import uniqid from "uniqid";
import LabelRename from "./LabelRename";

function ExpenseModules(props) {
  const { expenses, setExpenses } = props;

  function addExpense(e) {
    e.preventDefault();

    if (expenses.length > 30) return alert("Maximum limit reached");

    setExpenses((prev) => {
      console.log(prev);
      return [...prev, { name: "Expense", expense: "", id: uniqid() }];
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
      <div className="input-item" key={item.id}>
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
          className="money-input"
        ></input>
      </div>
    );
  });

  return (
    <>
      <button className="btn btn-success" onClick={addExpense}>
        Add Expense
      </button>
      <div className="d-flex flex-wrap scroll justify-content-center">
        {expensePrompts}
      </div>
    </>
  );
}

export default ExpenseModules;
