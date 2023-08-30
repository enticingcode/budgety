import React from "react";
import { updateFirebaseValues } from "../authFiles/FirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  deleteIncome,
  deleteSavings
} from "../features/financials/financeSlice";
import { Link } from "react-router-dom";
import ViewAll from "../ViewAll";
import AddNew from "./AddNew";
import "../styles/cashFlowModule.css"
import { useAuth } from "../authFiles/auth";

function CashFlowModule(props) {
  const user = useAuth().user.uid;
  const dispatch = useDispatch();
  const { cashFlow, moduleName } = props;

  // This is for deletion purposes.
  const [isSelectActive, setIsSelectActive] = React.useState(false);

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
    if(elementCategory == "Savings")dispatch(deleteSavings(newArr));
    updateFirebaseValues(user, moduleName, newArr, "del");

    // Once 1 item is left, we setIsSelectActive to false
    if (cashFlow.length == 1) setIsSelectActive(false);
  }

  let firstSevenItems = cashFlow.slice(0, 7);

  return (
    <div className="module">
      <h2>{moduleName}</h2>
      <div className="financeItem-containers">
        <div className="finance-legend">
          <p>Name</p>
          <p>Date</p>
          <p>Amount</p>

          {/* When I click add new, it should pop up a modal for the corresponding category of income, expenses or savings */}
          <AddNew  moduleName={moduleName}/>
          
        </div>
        <div className="items-container">
          {cashFlow.length > 0 ? (
            firstSevenItems.map((item) => {
              return (
                <div
                // If isSelectActive, animation to select items will appear on left side;
                  className={`finance-item ${isSelectActive ? "select-items": ""}`}
                  data-category={item.category}
                  key={item.id}
                  id={item.id}
                >
                  <div onClick={deleteItem} className={`closeOut ${isSelectActive ? "selectWidth": ""}`}>
                  <img
                    src="/xout.png"
                    alt="Delete"
                  />
                  </div>
                  <div className="finance-item-info">
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
