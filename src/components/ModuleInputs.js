import React from "react";
import uniqid from "uniqid";
import { updateFirebaseValues } from "./FirebaseAuth";
import { useAuth } from "./auth";

function ModuleInputs(props) {
  const localAuth = useAuth();
  const { cashFlow, setCashFlow, moduleName } = props;
  const [input, setInput] = React.useState({
    [moduleName]: "",
    amount: "",
  });

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addItem(e) {
    e.preventDefault();
    if (cashFlow.length > 50)
      return alert(
        "Maximum limit reached for safety reasons, maybe try not spending so much? :) haha"
      );
    let newExpenseObj = {
      name: input[moduleName],
      amount: input.amount,
      id: uniqid(),
    };

    setCashFlow((prev) => {
      return [...prev, newExpenseObj];
    });

    updateFirebaseValues(localAuth.user, moduleName, newExpenseObj, "add");
    setInput({ [moduleName]: "", amount: "" });
  }

  function deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;

    let newArr = cashFlow.filter((item) => {
      return item.id !== elementID;
    });

    setCashFlow(newArr);
    updateFirebaseValues(localAuth.user, moduleName, newArr, "del");
  }

  let expenseElements = cashFlow.map((item) => {
    return (
      <div className="input-item" key={item.id} id={item.id}>
        <p className="money-info">
          {item.name}: ${item.amount}
        </p>
        <img
          onClick={deleteItem}
          className="closeOut"
          src="/xout.png"
          alt="Delete"
        />
      </div>
    );
  });

  return (
    <>
      <div className="in-headers">
        <h2>{moduleName}</h2>
        <form className="form-inp" onSubmit={addItem}>
          <input
            onChange={handleChange}
            name={moduleName}
            value={input[moduleName]}
            className="input-box"
            placeholder="Name"
            required
          ></input>
          <input
            onChange={handleChange}
            name="amount"
            value={input.amount}
            className="input-box"
            placeholder="$ Amount"
            required
          ></input>
          <button className="input-btn">Add</button>
        </form>
        <div className="fin-container">{expenseElements}</div>
      </div>
    </>
  );
}

export default ModuleInputs;
