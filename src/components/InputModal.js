import React from "react";
import { updateFirebaseValues } from "../auth/FirebaseAuth";
import uniqid from "uniqid";
import { auth } from "../auth/FirebaseAuth";
import { useDispatch } from "react-redux";
import {
  addIncome,
  addExpense,
  addSavings,
} from "../features/financials/financeSlice";
import { changeActiveStatus } from "../features/utilities/modalSlice";

function InputModal(props) {
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

  console.log('render', "\n");

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;
    // if (value === "Income") setCategory("Income");

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addItem(e) {
    e.preventDefault();

    let newExpenseObj = {
      category: category,
      name: input.name,
      amount: input.amount,
      id: uniqid(),
      date: new Date().toLocaleDateString(),
    };

    console.log(input.category);

    if (category === "Income") dispatch(addIncome(newExpenseObj));
    if (category === "Expenses") dispatch(addExpense(newExpenseObj));
    if (category === "Savings") dispatch(addSavings(newExpenseObj));

    updateFirebaseValues(auth.currentUser, category, newExpenseObj, "add");
    setInput({ name: "", amount: "", category: "" });
    dispatch(changeActiveStatus(false));
  }

  // except for a few exceptions.
  // Don't need to props of incomes,expenses, etc since the modal will be the one to set this.

  return (
    <div className="modal-screen">
      <div className="modal-container">
        <form className="form-container" onSubmit={addItem}>
          {/* <label id="category-label" htmlFor="category">Category</label> */}
          {/* <select id="category"  name="category" onChange={handleChange} > */}
          {/* <option defaultValue value="Income">Income</option> */}
          {/* <option value="Expenses">Expense</option> */}
          {/* <option value="Savings">Savings</option> */}
          {/* </select> */}
          <div className="cashFlow-choices">
            <input
              className="button input-category"
              type="button"
              value="Income"
              name="Income"
              onClick={handleCategory}
            />
            <input
              className="button input-category"
              type="button"
              value="Expenses"
              name="Expenses"
              onClick={handleCategory}
            />
            <input
              className="button input-category"
              type="button"
              value="Savings"
              name="Savings"
              onClick={handleCategory}
            />
          </div>
          <div className="input-amounts">
            {/* <select className="" name="Type" placeholder="Type">
              <option value="Debt">Debt</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
            </select> */}
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
