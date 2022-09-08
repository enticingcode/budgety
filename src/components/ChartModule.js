import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ChartModule = (props) => {
  const { chartData, stateNames } = props;

  // PIE CHART DATA
  ChartJS.register(ArcElement, Tooltip, Legend);

  let dataNames = stateNames.map((item) => {
    return item.name;
  });

  console.log(stateNames);

  // PIE CHART DATA HERE
  const data = {
    labels: [...dataNames],
    datasets: [
      {
        label: "Budget Tracker",
        data: [...chartData],
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
  return (
    <>
      <Pie className="chart-item" data={data} responsive={"true"} />
    </>
  );
};

export default ChartModule;
