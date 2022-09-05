import React from "react";

function IncomeModules(props) {
  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;

    //Check for number value, if NaN return;

    if (isNaN(value)) return;

    //Use input target id, to reference income object in state array, and update matching obj
    props.setIncomeSources((prev) => {
      return prev.map((obj) => {
        if (obj.id === nodeTarget) {
          return { ...obj, income: value };
        }
        return obj;
      });
    });
  }

  let incomePrompts = props.incomeSources.map((item) => {
    return (
      <div key={item.id}>
        <label htmlFor={item.id}>Income:</label>
        <input
          onChange={handleChange}
          id={item.id}
          value={item.income}
          name=""
          className="income-input"
        ></input>
      </div>
    );
  });

  return (
    <div className="income-container">
      <h2>Monthly Incomes:</h2>
      {incomePrompts}
      {/* <button onClick={addIncomeInput}>Add Income</button> */}
    </div>
  );
}

export default IncomeModules;

// function addIncomeInput(e) {
//   e.preventDefault();
//   setIncomeSources((prev) => {
//     console.log(prev);
//     return [...prev, { income: "", id: uniqid() }];
//   });
// }
