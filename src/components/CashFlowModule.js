import React from "react";
import { updateFirebaseValues } from "../auth/FirebaseAuth";
import { auth } from "../auth/FirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  deleteIncome,
} from "../features/financials/financeSlice";
import { Link } from "react-router-dom";
import ViewAll from "../ViewAll";
import MoreOptions from "./MoreOptions";
import "../styles/cashFlowModule.css"

function CashFlowModule(props) {
  const dispatch = useDispatch();
  const { cashFlow, moduleName } = props;

  const isSelectionActive = useSelector(state => state.selectItems.isSelectActive);

  function deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;
    let elementCategory = e.currentTarget.parentElement.dataset.category;

    console.log(elementCategory);

    let newArr = cashFlow.filter((item) => {
      return item.id !== elementID;
    });

    if (elementCategory == "Income") dispatch(deleteIncome(newArr));
    if (elementCategory == "Expenses") dispatch(deleteExpense(newArr));
    // if(elementCategory == "Savings")dispatch(deleteSavings(newArr));
    updateFirebaseValues(auth.currentUser, moduleName, newArr, "del");
  }

  let firstSevenItems = cashFlow.slice(0, 7);

  return (
    <div className="module">
      <h2>{moduleName}</h2>
      <div className="financeItem-containers">
        <div className="finance-legend">
        {/* <button className="deleteItem">Delete</button> */}
          <p>Name</p>
          <p>Date</p>
          <p>Amount</p>
          {/* More Options to be rolled out later */}
          <MoreOptions />
        </div>
        <div className="items-container">
          {cashFlow.length > 0 ? (
            firstSevenItems.map((item) => {
              return (
                <div
                // If isSelectionActive, animation to select items will appear on left side;
                  className={`finance-item ${isSelectionActive ? "select-items": ""}`}
                  data-category={item.category}
                  key={item.id}
                  id={item.id}
                >
                  <div onClick={deleteItem} className={`closeOut ${isSelectionActive ? "selectWidth": ""}`}>
                  <img
                    src="/xout.png"
                    alt="Delete"
                  />
                  </div>
                  <div>
                  <p>{item.name}</p>
                  <p>{item.date}</p>
                  <p>${item.amount}</p>
                  <span></span>
                  </div>
                  
                </div>
              );
            })
          ) : (
            <div className="emptyMsg">
              <p>No Items Yet</p>
            </div>
          )}
          {cashFlow.length > 7 && (
            <Link
              to={`/viewall/${moduleName.toLowerCase()}`}
              state={{ type: moduleName }}
              className="finance-item view-allBtn"
            >
              View All
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CashFlowModule;
