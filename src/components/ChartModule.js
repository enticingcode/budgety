import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const ChartModule = (props) => {
  const { chartData, stateNames } = props;

  // PIE CHART DATA
  ChartJS.register(ArcElement, Tooltip, Legend);

  let dataNames = stateNames.map((item) => {
    return item.name;
  });

  // Doughnut CHART DATA HERE
  const data = {
    labels: [...dataNames],
    datasets: [
      {
        label: "Budget Tracker",
        data: [...chartData],
        backgroundColor: [
          "rgb(96, 150, 180)",
          "rgb(147, 191, 207)",
          "rgb(189, 205, 214)",
          "rgb(238, 233, 218)",
          "rgb(139, 126, 116)",
          "rgb(241, 211, 179)",
          "rgb(101, 100, 124)",
          "rgb(199, 188, 161)",
        ],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "black",
        },
      },
    },
  };
  return (
    <>
      <Doughnut className="chart-item" data={data} options={options} />
    </>
  );
};

export default ChartModule;
