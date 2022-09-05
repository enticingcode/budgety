import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ChartModule = (props) => {
  const { incomeSources, expenses } = props;
  // PIE CHART DATA
  ChartJS.register(ArcElement, Tooltip, Legend);

  let totalIncome = incomeSources.map((item) => {
    return item.income;
  });

  let totalExpenses = expenses.map((item) => {
    return item.expense;
  });

  let expenseNames = expenses.map((item) => {
    return item.name;
  });

  // Add values of filtered array to display;
  function addValues(arr) {
    let final;
    let newArr = arr.filter((item) => parseInt(item));

    if (newArr.length === 1) return arr[0];

    if (newArr.length > 1) {
      final = newArr.reduce((a, b) => {
        return parseInt(a) + parseInt(b);
      });
    }
    return final;
  }
  console.log(addValues(totalIncome));

  // PIE CHART DATA HERE
  const data = {
    labels: ["Income", ...expenseNames],

    datasets: [
      {
        label: "Budget Tracker",
        data: [addValues(totalIncome), ...totalExpenses],
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
  return <Pie data={data} />;
};

export default ChartModule;
