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
      <div className="finance-item" key={item.id} id={item.id}>
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
    <section className="module">
      <h2>{moduleName}</h2>
      <div className="input-containers">
        {expenseElements}
      </div>
    </section>
  );
}

export default ModuleInputs;


