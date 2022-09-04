import React from "react";
import uniqid from "uniqid";

function IncomeModules() {
  const [incomeSources, setIncomeSources] = React.useState([
    { income: 0, id: uniqid() },
  ]);

  function addIncomeInput(e) {
    e.preventDefault();
    setIncomeSources((prev) => {
      return [...prev, { income: 0 }];
    });
  }

  function handleChange(e) {}

  let incomePrompts = incomeSources.map((item) => {
    return (
      <>
        <label htmlFor=""></label>
        <input
          onChange={handleChange}
          key={item.id}
          id={item.id}
          value={item.income}
          name=""
          className="income-input"
        ></input>
      </>
    );
  });

  return (
    <div>
      {incomePrompts}
      <button onClick={addIncomeInput}>Add Income</button>
    </div>
  );
}

export default IncomeModules;
