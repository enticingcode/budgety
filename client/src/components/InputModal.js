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
import { isModalActive } from "../features/utilities/modalSlice";

function InputModal(props) {
  const user = useAuth().user.uid;
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState(props.category);

// console.log(category);

  const [input, setInput] = React.useState({
    name: "",
    amount: "",
    category: category,
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
    // props.setIsModalActive(false);
    dispatch(isModalActive(false));
  }

  // Array mapped for input selections with dynamic highlighting of each individual button
  return (
    <div className="modal-screen">
      <div className="modal-container">
        <form className="form-container" onSubmit={addItem}>
          <div className="cashFlow-choices">
            <h2>{props.category}</h2>
          </div>
          <div className="input-amounts">
            <input
              className="input-box"
              placeholder="Name"
              onChange={handleChange}
              name="name"
              value={input.name}
              required
              autoFocus
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
              onClick={() => dispatch(isModalActive(false))}
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
