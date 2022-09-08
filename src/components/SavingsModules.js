import React from "react";
import LabelRename from "./LabelRename";
import uniqid from "uniqid";

const SavingsModules = (props) => {
  const { savingsAllocation, setSavingsAllocation } = props;

  function addSavingsInput(e) {
    e.preventDefault();
    setSavingsAllocation((prev) => {
      console.log(prev);
      return [
        ...prev,
        { name: "New Allocation", allocation: "", id: uniqid() },
      ];
    });
  }

  // this is where i have to decide if I want to label expenses by numbers or keep them empty, mabe inplement naming of input labels instead,
  // save trouble on numbering cluster logic?

  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;

    if (isNaN(value)) return;

    setSavingsAllocation((prev) => {
      return prev.map((obj) => {
        if (obj.id === nodeTarget) {
          return { ...obj, allocation: value };
        }
        return obj;
      });
    });
  }

  let allocationPrompts = savingsAllocation.map((item) => {
    return (
      <div className="expense-item" key={item.id}>
        {/* this label has to be editable component */}
        <LabelRename
          category={savingsAllocation}
          stateSetter={setSavingsAllocation}
          name={item.name}
          htmlFor={item.id}
        />
        <input
          onChange={handleChange}
          id={item.id}
          value={item.allocation}
          name={item.name}
          className="expense-input"
        ></input>
      </div>
    );
  });

  return (
    <>
      <div className="input-containers">
        <h2>Allocations</h2>
        {allocationPrompts}
        <button onClick={addSavingsInput}>Add Allocation</button>
      </div>
    </>
  );
};

export default SavingsModules;
