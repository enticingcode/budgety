import React from "react";
import uniqid from "uniqid";

function IncomeModules(props) {
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
    setIncomeSources((prev) => {
      return [
        ...prev,
        {
          name: incomeInput.incomeName,
          income: incomeInput.amount,
          id: uniqid(),
        },
      ];
    });
  }

  function deleteIncome(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(e.target.parentElement.id);
  }

  let incomeElements = incomeSources.map((item) => {
    return (
      <div className="input-item" key={item.id} id={item.id}>
        <p>
          {item.name}: {item.income}
        </p>
        <button onClick={deleteIncome} className="trash-ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="in-headers my-3">
        <h2>Monthly Incomes</h2>
        <form onSubmit={addIncome}>
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
          <button type="submit" className="btn btn-success">
            Add Income
          </button>
        </form>
        <div className="i-e-container">{incomeElements}</div>
      </div>
    </>
  );
}

export default IncomeModules;
