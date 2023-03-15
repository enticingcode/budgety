import React from "react";
import uniqid from "uniqid";
import { updateFirebaseValues } from "./FirebaseAuth";
import { useAuth } from "./auth";

function ModuleInputs(props) {
  const localAuth = useAuth();
  const { cashFlow, setCashFlow, moduleName } = props;

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
      <div className="input-containers">
        <h2>{moduleName}</h2>
        
        <div className="fin-container">{expenseElements}</div>
      </div>
    </>
  );
}

export default ModuleInputs;


{/* <form className="form-input" onSubmit={addItem}>
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
        </form> */}