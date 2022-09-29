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

    console.log(name, value);

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
        <button onClick={deleteSavings} className="trash-ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="in-headers my-3">
        <form
          className="form-inp d-flex align-items-center justify-content-center"
          onSubmit={addSavingsInput}
        >
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
          <button type="submit" className="input-btn btn btn-success">
            Add Allocation
          </button>
        </form>
        <div className="fin-container">{allocationElements}</div>
      </div>
    </>
  );
};

export default SavingsModules;
