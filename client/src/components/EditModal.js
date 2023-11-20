import React from "react";
import { updateFirebaseValues } from "../authFiles/FirebaseAuth";
import uniqid from "uniqid";
import { useAuth } from "../authFiles/auth";
import { useDispatch } from "react-redux";
import {
  editIncome,
  addExpense,
  addSavings,
} from "../features/financials/financeSlice";

function InputModal(props) {
  const user = useAuth().user.uid;
  const dispatch = useDispatch();
  const { currentEdit } = props;



  const [input, setInput] = React.useState({
    name: currentEdit.name,
    amount: currentEdit.amount,
    category: currentEdit.category,
    id: currentEdit.id,
    date: currentEdit.date,
  });

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
        date: new Date().toLocaleDateString(),
      };
    });
  }

  console.log(input);

  function editItem(e) {
    e.preventDefault();


    // Need to dispatch an edit here

    // This dispatch will either need to look for the current id item within the existing array of items and edit it, or return a new list
    if (input.category === "Income") dispatch(editIncome(input));
    // if (input.category === "Expenses") dispatch(addExpense(input));
    // if (input.category === "Savings") dispatch(addSavings(input));
    

    // this is currently sending an object instead of array to firebase, change the way this is sent.
    updateFirebaseValues(user, input.category, input, "edit");
    setInput({ name: "", amount: "", category: "" });
    props.setIsEditActive(false);
  }


  // Array mapped for input selections with dynamic highlighting of each individual button
  return (
    <div className="modal-screen">
      <div className="modal-container">
        <form className="form-container" onSubmit={editItem}>
          <div className="cashFlow-choices">
            <h2>{currentEdit.category}</h2>
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
              onClick={() => props.setIsEditActive(false)}
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
