import React from "react";
import { updateFirebaseValues } from "../authFiles/FirebaseAuth";
import uniqid from "uniqid";
import { useAuth } from "../authFiles/auth";
import { useDispatch } from "react-redux";
import {
  addIncome,
  addExpense,
  addSavings,
} from "../features/financials/financeSlice";
import { changeActiveStatus } from "../features/utilities/modalSlice";

function InputModal(props) {
  const user = useAuth().user.uid;
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState(null);
  const [categoryNullWarning, setIsCategoryNullWarning] = React.useState(false);

  const [input, setInput] = React.useState({
    name: "",
    amount: "",
    category: category,
  });

  function handleCategory(e) {
    e.preventDefault();
    let name = e.target.name;

    setCategory(name);
    setIsCategoryNullWarning(false);
  }

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

    if (category === null) {
      setIsCategoryNullWarning(true);
      return;
    }

    // How do we handle an error for no cat selected?

    let newExpenseObj = {
      category: category,
      name: input.name,
      amount: input.amount,
      id: uniqid(),
      date: new Date().toLocaleDateString(),
    };


    if (category === "Income") dispatch(addIncome(newExpenseObj));
    if (category === "Expenses") dispatch(addExpense(newExpenseObj));
    if (category === "Savings") dispatch(addSavings(newExpenseObj));
    
    updateFirebaseValues(user, category, newExpenseObj, "add");
    setInput({ name: "", amount: "", category: "" });
    dispatch(changeActiveStatus(false));
  }

  // Array mapped for input selections with dynamic highlighting of each individual button
  let inputChoices = ["Income", "Expenses", "Savings"]

  return (
    <div className="modal-screen">
      <div className="modal-container">
        <form className="form-container" onSubmit={addItem}>
        {categoryNullWarning && <p>Please Select a Category!</p>}
          <div className="cashFlow-choices">
            {inputChoices.map(item => {
              return (
              <input
                key={item}
                className={`button input-category ${category == item ? "selected" : ""}`}
                type="button"
                value={item}
                name={item}
                onClick={handleCategory}
              />
              )
            })}
          </div>
          <div className="input-amounts">
            <input
              className="input-box"
              placeholder="Name"
              onChange={handleChange}
              name="name"
              value={input.name}
              required
            ></input>
            <input
              className="input-box"
              placeholder="$"
              onChange={handleChange}
              name="amount"
              value={input.amount}
              required
            ></input>
          </div>
          <div className="input-selection">
            <button
              type="button"
              onClick={(e) => dispatch(changeActiveStatus(false))}
              className="button"
            >
              Close
            </button>
            <button type="submit" className="button add-btn">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputModal;
