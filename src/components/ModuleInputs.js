import React from "react";
import { updateFirebaseValues } from "./FirebaseAuth";
import { useAuth } from "./auth";
import { useDispatch } from "react-redux";
import { deleteExpense, deleteIncome } from "../features/financials/financeSlice";
import { Link } from "react-router-dom";
import ViewAll from "../ViewAll";

function ModuleInputs(props) {
  const dispatch = useDispatch();
  const localAuth = useAuth();
  const { cashFlow, moduleName } = props;

  function deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;
    let elementCategory = e.currentTarget.parentElement.dataset.category;

    console.log(elementCategory);

    let newArr = cashFlow.filter((item) => {
      return item.id !== elementID;
    });

    if(elementCategory == "Income")dispatch(deleteIncome(newArr));
    if(elementCategory == "Expenses")dispatch(deleteExpense(newArr));
    // if(elementCategory == "Savings")dispatch(deleteSavings(newArr));
    updateFirebaseValues(localAuth.user, moduleName, newArr, "del");
  }

  let firstSevenItems = cashFlow.slice(0, 7);

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
        <div className="items-container">
          {cashFlow.length > 0 ? (
            firstSevenItems.map((item) => {
              return (
                <div className="finance-item" data-category={item.category} key={item.id} id={item.id}>
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
            })
          ) : (
            <div className="emptyMsg">
              <p>No Items Yet</p>
            </div>
          )}
          {cashFlow.length > 7 && <Link to={`/viewall/${moduleName.toLowerCase()}`} state={{type: moduleName}}className="finance-item view-allBtn">View All</Link>}
        </div>
      </div>
    </div>
  );
}

export default ModuleInputs;