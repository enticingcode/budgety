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

  const [input, setInput] = React.useState({
    name: "",
    amount: "",
    category: category,
  });

  function handleCategory(e) {
    e.preventDefault();
    let name = e.target.name;

    setCategory(name);
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

  console.log(user);

  function addItem(e) {
    e.preventDefault();

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

  // except for a few exceptions.
  // Don't need to props of incomes,expenses, etc since the modal will be the one to set this.

  return (
    <div className="modal-screen">
      <div className="modal-container">
        <form className="form-container" onSubmit={addItem}>
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
