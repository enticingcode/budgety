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
import MoreOptions from "./MoreOptions";
import EditModal from "./EditModal";

function CashFlowModule(props) {

  const user = useAuth().user.uid;
  const dispatch = useDispatch();
  const { cashFlow, moduleName } = props;
  let firstFewItems = cashFlow.slice(0, 4);

  // This is for deletion purposes.
  const [isSelectActive, setIsSelectActive] = React.useState(false);
  const [isEditActive, setIsEditActive] = React.useState(false);
  const [currentEdit, setCurrentEdit] = React.useState(null);

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
    if (elementCategory == "Savings") dispatch(deleteSavings(newArr));
    updateFirebaseValues(user, moduleName, newArr, "del");

    // Once 1 item is left, we setIsSelectActive to false
    if (cashFlow.length == 1) setIsSelectActive(false);
  }

  // handleEdit should somehow create input fields on item? or bring modal back up?
  function handleEdit(e) {
    let elementID = e.currentTarget.parentElement.id;
    // console.log(e.currentTarget.parentElement.id);

    let selectedItem = cashFlow.find(item => {
      return item.id == elementID;
    })
    // console.log(selectedItem);

    // console.log(cashFlow);

    // Selected Item is passed into a state which will be passed unto "EditModal" component.
    setCurrentEdit(selectedItem);
    setIsEditActive(true);
  }

  return (
    <div className="module">
      {/* Editing Modal Activates here */}
      {isEditActive && <EditModal currentEdit={currentEdit} setIsEditActive={setIsEditActive} cashFlowItems={cashFlow} />}
      <h2>{moduleName}</h2>
      <div className="financeItem-containers">
        <div className="finance-legend">
          <p>Name</p>
          <p>Date</p>
          <p>Amount</p>

          {/* When I click add new, it should pop up a modal for the corresponding category of income, expenses or savings */}
          <div>
            <svg onClick={()=> {setIsSelectActive(prev => !prev)}}xmlns="http://www.w3.org/2000/svg" fill="grey" className="modify-entries" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg>
          <AddNew moduleName={moduleName} />
          </div>

        </div>
        <div className="items-container">
          {cashFlow.length > 0 ? (
            firstFewItems.map((item) => {
              return (
                <div
                  // If isSelectActive, animation to select items will appear on left side;
                  className={`finance-item ${isSelectActive ? "select-items" : ""}`}
                  data-category={item.category}
                  key={item.id}
                  id={item.id}
                >
                  <div onClick={deleteItem} className={`closeOut ${isSelectActive ? "selectWidth" : ""}`}>
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


                  <div onClick={handleEdit}>
                    <svg className="edit-item" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                      <path pointerEvents="none" d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z" />
                    </svg>
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
