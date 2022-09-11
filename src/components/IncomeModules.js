import React from "react";

function IncomeModules(props) {
  const { incomeSources, setIncomeSources } = props;

  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;

    //Check for number value, if NaN return;
    if (isNaN(value)) return;

    //Use input target id, to reference income object in state array, and update matching obj
    setIncomeSources((prev) => {
      return prev.map((obj) => {
        if (obj.id === nodeTarget) {
          return { ...obj, income: value };
        }
        return obj;
      });
    });
  }

  let incomePrompts = incomeSources.map((item) => {
    return (
      <div className="input-item" key={item.id}>
        {/* <LabelRename /> */}
        <label htmlFor={item.id}>Income </label>
        <input
          onChange={handleChange}
          id={item.id}
          value={item.income}
          name=""
          className="money-input"
        ></input>
      </div>
    );
  });

  return (
    <>
      <h2>Monthly Incomes</h2>
      {incomePrompts}
    </>
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
