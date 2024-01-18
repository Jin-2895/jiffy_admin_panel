import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart({ orderStats }) {
  const data = {
    labels: ["Recent", "New", "Pending", "Cancel"],
    datasets: [
      {
        data: [
          orderStats.recentOrders?.length,
          orderStats.orderStatus?.data[2],
          orderStats.orderStatus?.data[0],
        ],
        backgroundColor: ["#FFB70F", "#00D0BD", "#DB3C30"],
        hoverBackgroundColor: ["#FFB70F", "#00D0BD", "#DB3C30"],
      },
    ],
  };
  const options = {
    legend: {
      display: false,
      labels: { fontColor: "#AAAEB3" },
    },
    cutoutPercentage: 50,
  };
  return <Doughnut data={data} options={options} height={100} />;
}
