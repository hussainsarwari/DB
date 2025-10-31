import React from "react";
import Chart from "react-apexcharts";

export default function ProductionChart({ darkmode }) {
  const series = [
    {
      name: "Production Output",
      data: [120, 150, 170, 140, 160, 180, 200],
    },
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: { show: true },
      foreColor: darkmode ? "#f9fafb" : "#1f2937", // متن محور و legend
      background: darkmode ? "#1f2937" : "#ffffff", // پس‌زمینه نمودار
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: darkmode ? "#f9fafb" : "#1f2937" } },
    },
    yaxis: {
      labels: { style: { colors: darkmode ? "#f9fafb" : "#1f2937" } },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
    },
    tooltip: {
      theme: darkmode ? "dark" : "light",
    },
    grid: {
      borderColor: darkmode ? "#374151" : "#e5e7eb",
    },
    colors: ["#3b82f6"],
    legend: {
      labels: { colors: darkmode ? "#f9fafb" : "#1f2937" },
    },
  };

  return (
    <div
      className={`p-4 rounded-2xl shadow-md transition-colors ${
        darkmode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
