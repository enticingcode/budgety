import React from "react";
import editImg from "../assets/images/edit.svg";

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
      <div className="input-item" key={item.id} id={item.id}>
        <h5 className="text-decoration-underline">Income</h5>

        <input
          onChange={handleChange}
          id={item.id}
          value={item.income}
          name={item.name}
          className="money-input"
        ></input>
      </div>
    );
  });

  return <>{incomePrompts}</>;
}

export default IncomeModules;
