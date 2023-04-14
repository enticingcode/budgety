import React from "react";
import { updateFirebaseValues } from "./FirebaseAuth";
import { useAuth } from "./auth";
import { useDispatch } from "react-redux";
import { deleteIncome } from "../features/financials/financeSlice";

function ModuleInputs(props) {
  const dispatch = useDispatch();
  const localAuth = useAuth();
  const { cashFlow, moduleName } = props;

  function deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;

    console.log(elementID);

    let newArr = cashFlow.filter((item) => {
      return item.id !== elementID;
    });
    
    console.log(newArr);
    dispatch(deleteIncome(newArr))
    updateFirebaseValues(localAuth.user, moduleName, newArr, "del");
  };

  let moneyElements = cashFlow.map((item) => {
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
    <div className="module">
      <h2>{moduleName}</h2>
      <div className="financeItem-containers">
        <div className="finance-legend">
          <p>Name</p>
          <p>Type</p>
          <p>Date</p>
          <p>Amount</p>
        </div>
        {cashFlow.length < 1 && <div className="emptyMsg"><p>No Items Yet</p></div>}
        {moneyElements}
      </div>
    </div>
  );
};

export default ModuleInputs;


