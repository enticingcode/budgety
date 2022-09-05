import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ChartModule = (props) => {
  // PIE CHART DATA
  ChartJS.register(ArcElement, Tooltip, Legend);

  let totalIncome = props.incomeSources.filter((item) => {
    return parseInt(item.income);
  });

  console.log(totalIncome);
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
  console.log(addValues(totalIncome));

  //   console.log(totalIncome);

  const data = {
    labels: ["Income", "Rent", "Phone", "Utilities"],

    datasets: [
      {
        label: "Budget Tracker",
        data: [addValues(totalIncome)],
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
