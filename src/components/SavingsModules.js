import React from "react";
import LabelRename from "./LabelRename";
import uniqid from "uniqid";

const SavingsModules = (props) => {
  const { savingsAllocation, setSavingsAllocation } = props;
  const [savingsInput, setSavingsInput] = React.useState({
    savingsName: "",
    amount: "",
  });

  function addSavingsInput(e) {
    e.preventDefault();
    if (savingsAllocation.length > 25)
      return alert(
        "Maximum limit reached, stop saving so much damn, can't take that money to the grave now"
      );
    setSavingsAllocation((prev) => {
      return [
        ...prev,
        {
          name: savingsInput.savingsName,
          allocation: savingsInput.amount,
          id: uniqid(),
        },
      ];
    });
    setSavingsInput({
      savingsName: "",
      amount: "",
    });
  }

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;

    setSavingsInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function deleteSavings(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;

    setSavingsAllocation((prev) => {
      return prev.filter((item) => {
        return item.id !== elementID;
      });
    });
  }

  let allocationElements = savingsAllocation.map((item) => {
    return (
      <div className="input-item" key={item.id} id={item.id}>
        <p className="money-info">
          {item.name}: ${item.allocation}
        </p>
        <img className="closeOut" src="/xout.png" alt="Delete"></img>
      </div>
    );
  });

  return (
    <>
      <div className="in-headers">
        <form className="form-inp" onSubmit={addSavingsInput}>
          <input
            onChange={handleChange}
            name="savingsName"
            value={savingsInput.savingsName}
            className="input-box"
            placeholder="Name e.g. 401k"
            required
          ></input>
          <input
            onChange={handleChange}
            name="amount"
            value={savingsInput.amount}
            className="input-box"
            placeholder="$ Amount"
            required
          ></input>
          <button type="submit" className="input-btn">
            Add
          </button>
        </form>
        <div className="fin-container">{allocationElements}</div>
      </div>
    </>
  );
};

export default SavingsModules;
