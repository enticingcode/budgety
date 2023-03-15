import React from 'react'
import { updateFirebaseValues } from "./FirebaseAuth";
import uniqid from "uniqid";
import { useAuth } from "./auth";



function InputModal() {
  const localAuth = useAuth();
  const { cashFlow, setCashFlow } = props;

    const [input, setInput] = React.useState({
        [moduleName]: "",
        amount: "",
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
        if (cashFlow.length > 50)
          return alert(
            "Maximum limit reached for safety reasons, maybe try not spending so much? :) haha"
          );
        let newExpenseObj = {
          name: input[moduleName],
          amount: input.amount,
          id: uniqid(),
        };
    
        setCashFlow((prev) => {
          return [...prev, newExpenseObj];
        });
    
        updateFirebaseValues(localAuth.user, moduleName, newExpenseObj, "add");
        setInput({ [moduleName]: "", amount: "" });
      }


      // Need to dispose of props that aren't needed. This modal will pretty much function independent of what was previously done.

      // except for a few exceptions. 
      // Don't need to props of incomes,expenses, etc since the modal will be the one to set this.

  return (
    <div className="modal-screen">
        <div className="modal-container">
        <form className="form-input" onSubmit={addItem}>
            <select>

            </select>
          <input
            onChange={handleChange}
            name={moduleName}
            value={input[moduleName]}
            className="input-box"
            placeholder="Name"
            required
          ></input>
          <input
            onChange={handleChange}
            name="amount"
            value={input.amount}
            className="input-box"
            placeholder="$ Amount"
            required
          ></input>
          <button className="input-btn">Add</button>
        </form>
        </div>
    </div>
  )
}

export default InputModal;