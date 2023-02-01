import React from "react";
import uniqid from "uniqid";
import { useAuth } from "./auth";
import { updateFirebaseValues } from "./FirebaseAuth";

function IncomeModules(props) {
  const localAuth = useAuth();
  const { incomeSources, setIncomeSources } = props;
  const [incomeInput, setIncomeInput] = React.useState({
    incomeName: "",
    amount: "",
  });

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;

    if (name === "amount" && isNaN(value)) return;

    setIncomeInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addIncome(e) {
    e.preventDefault();
    if (!incomeInput.incomeName || !incomeInput.amount) return;
    if (incomeSources.length >= 4) return alert("Maximum limit reached");

    let newIncomeObj = {
      name: incomeInput.incomeName,
      income: incomeInput.amount,
      id: uniqid(),
    };

    setIncomeSources((prev) => {
      return [...prev, newIncomeObj];
    });

    updateFirebaseValues(localAuth.user, "incomeSources", newIncomeObj, "add");
    setIncomeInput({ incomeName: "", amount: "" });
  }

  function deleteIncome(e) {
    e.preventDefault();
    e.stopPropagation();
    let elementID = e.currentTarget.parentElement.id;

    let newArr = incomeSources.filter((item) => {
      return item.id !== elementID;
    });

    setIncomeSources(newArr);
    updateFirebaseValues(localAuth.user, "incomeSources", newArr, "del");
    // taken from setIncomeSources above;
    // (prev) => {
    //   return prev.filter((item) => {
    //     return item.id !== elementID;
    //   });
    // }
  }

  // make component from this //
  let incomeElements = incomeSources.map((item) => {
    return (
      <div className="input-item" key={item.id} id={item.id}>
        <p className="money-info">
          {item.name}: ${item.income}
        </p>

        {/* image here */}
        <img
          onClick={deleteIncome}
          className="closeOut"
          src="/xout.png"
          alt="Delete"
        />
      </div>
    );
  });

  return (
    <>
      <div className="in-headers">
        <h2>Monthly Incomes</h2>
        <form className="form-inp" onSubmit={addIncome}>
          <input
            onChange={handleChange}
            name="incomeName"
            value={incomeInput.incomeName}
            className="input-box"
            placeholder="Income"
            required
          ></input>
          <input
            onChange={handleChange}
            name="amount"
            value={incomeInput.amount}
            className="input-box"
            placeholder="$ Amount"
            required
          ></input>
          <button type="submit" className="input-btn">
            Add
          </button>
        </form>
        <div className="fin-container">{incomeElements}</div>
      </div>
    </>
  );
}

export default IncomeModules;
