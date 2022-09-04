import React from "react";
import "../styles/testSession.css";
import { Chart, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// DOC;
// Test session provides a preview application of Budgety
// providing a simple example of budget tracking

const TestSession = () => {
  const [income, setIncome] = React.useState({
    income1: "",
    income2: "",
  });

  const [expenses, setExpenses] = React.useState({
    rent: "",
    phone: "",
    utilities: "",
  });

  let totalIncome = Object.values(income).filter((item) => {
    return parseInt(item);
  });

  let totalExpenses = Object.values(expenses).filter((item) => {
    return parseInt(item);
  });

  // Add values of filtered array to display;
  function addValues(arr) {
    let calculables;
    if (arr.length === 1) return arr[0];

    if (arr.length > 0) {
      calculables = arr.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    }
    return calculables;
  }

  // console.log(addValues(totalIncome));

  function handleChange(e) {
    const name = e.target.name;
    const className = e.target.className;
    let value = e.target.value;

    // Check that value is Number only.
    if (isNaN(value)) return;

    //If value is empty string return zero
    // if (value === "") value = 0;

    if (name.includes("income")) {
      setIncome((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else if (className.includes("expense")) {
      setExpenses((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  // PIE CHART DATA
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Income 1", "Income 2", "Rent", "Phone", "Utilities"],

    datasets: [
      {
        label: "Budget Tracker",
        data: [
          income.income1,
          income.income2,
          expenses.rent,
          expenses.phone,
          expenses.utilities,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  // console.log(income, expenses)

  return (
    // PREVIEW OF APPLICATION //
    <>
      <div className="test-container">
        <section className="main-display">
          <div className="stats">
            <h1>Overview:</h1>
            <h3>Income: {addValues(totalIncome)}</h3>
            <h3>Allocated: {addValues(totalExpenses)}</h3>
            <h3>
              Remaining:{" "}
              {addValues(totalIncome) - addValues(totalExpenses) || ""}
            </h3>
          </div>
          <div className="chart">
            <Pie data={data} />
          </div>
        </section>

        <section className="userInputs">
          {/* Incomes */}
          <div className="input-sections income-inputs">
            <h2>Income:</h2>
            <label htmlFor="income1">Income 1:</label>
            <input
              id="income1"
              className="input-item"
              name="income1"
              onChange={handleChange}
              value={income.income1}
            ></input>

            <label htmlFor="income2">Income 2:</label>
            <input
              id="income2"
              className="input-item"
              name="income2"
              onChange={handleChange}
              value={income.income2}
            ></input>
          </div>

          {/* Expenses */}
          <div className="input-sections expense-inputs">
            <h2>Expenses:</h2>
            <label htmlFor="rent-expense">Rent:</label>
            <input
              id="rent-expense"
              className="expense input-item"
              name="rent"
              onChange={handleChange}
              value={expenses.rent}
            ></input>

            <label htmlFor="phone-expense">Phone:</label>
            <input
              id="phone-expense"
              className="expense input-item"
              name="phone"
              onChange={handleChange}
              value={expenses.phone}
            ></input>

            <label htmlFor="utilities-expense">Utilities:</label>
            <input
              id="utilities-expense"
              className="expense input-item"
              name="utilities"
              onChange={handleChange}
              value={expenses.utilities}
            ></input>
          </div>
        </section>
      </div>

      <div className="full-app-preview">
        <h2>Register for full featured application</h2>

        <section>
          {/* preview video of application functionality? */}
          <p>preview of full app here</p>
        </section>
      </div>
    </>
  );
};

export default TestSession;
