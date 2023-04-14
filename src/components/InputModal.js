import React from 'react'
import { updateFirebaseValues } from "./FirebaseAuth";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import { useDispatch } from "react-redux";
import { addIncome, addExpense } from '../features/financials/financeSlice';

function InputModal(props) {
  const localAuth = useAuth();
  const dispatch = useDispatch();
  const { toggleModal } = props;

    const [input, setInput] = React.useState({
        name: "",
        amount: "",
        category: "Income",
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

        console.log('form submit')
        
        let newExpenseObj = {
          name: input.name,
          amount: input.amount,
          id: uniqid(),
        };
    
        if(input.category === "Income") dispatch(addIncome(newExpenseObj));

        if(input.category === "Expense") dispatch(addExpense(newExpenseObj));

        // if(input.category === "Savings") dispatch(addIncome(newExpenseObj));
        
        updateFirebaseValues(localAuth.user, input.category, newExpenseObj, "add");
        setInput({ name: "", amount: "", category: "" });
        toggleModal();
      }

      // except for a few exceptions. 
      // Don't need to props of incomes,expenses, etc since the modal will be the one to set this.
  
  return (
    <div className="modal-screen">
        <div className="modal-container">
        <form className="form-container" onSubmit={addItem}>
          <label id="category-label" htmlFor="category">Category</label>
            <select id="category"  name="category" onChange={handleChange} >
              <option defaultValue value="Income">Income</option>
              <option value="Expenses">Expense</option>
              <option value="Savings">Savings</option>
            </select>
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
          <button type="button" onClick={toggleModal} className="input-btn">Close</button>
          <button type="submit" className="input-btn">Add</button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default InputModal;