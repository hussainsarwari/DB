import React from "react";
import Chart from "react-apexcharts";
import { useLanguage } from "../../Provider/LanguageContext";

const productionDetails = [
  { product: "Product A", productionTime: 5, rawMaterialUsed: 12, laborCount: 3, energyCost: 25, materialCost: 60, laborCost: 45 },
  { product: "Product B", productionTime: 8, rawMaterialUsed: 18, laborCount: 5, energyCost: 40, materialCost: 95, laborCost: 70 },
  { product: "Product C", productionTime: 6, rawMaterialUsed: 15, laborCount: 4, energyCost: 30, materialCost: 80, laborCost: 55 },
];

const calculateTotalCost = (item) => item.materialCost + item.laborCost + item.energyCost;

export default function ProductionChart() {
  const { darkmode, t } = useLanguage();

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: true },
      foreColor: darkmode ? "#E5E7EB" : "#111827",
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%", borderRadius: 6 }
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: productionDetails.map(item => item.product),
      labels: { style: { colors: darkmode ? "#E5E7EB" : "#111827" } }
    },
    yaxis: {
      labels: { style: { colors: darkmode ? "#E5E7EB" : "#111827" } }
    },
    fill: {
      colors: darkmode 
        ? ["#93C5FD", "#60A5FA", "#3B82F6", "#1E40AF"]  // آبی ملایم تا آبی تیره
        : ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],  // آبی و آبی روشن برای لایت مود
      opacity: 0.9
    },
    tooltip: {
      y: { formatter: (val) => `$${val}` }
    },
    legend: {
      labels: { colors: darkmode ? "#E5E7EB" : "#111827" }
    },
  };

  const chartSeries = [
    { name: t.materialCost, data: productionDetails.map(item => item.materialCost) },
    { name: t.laborCost, data: productionDetails.map(item => item.laborCost) },
    { name: t.energyCost, data: productionDetails.map(item => item.energyCost) },
    { name: t.totalCost, data: productionDetails.map(item => calculateTotalCost(item)) }
  ];

  return (
    <div className={`p-4 rounded-2xl shadow-lg transition-all ${darkmode ? "bg-gray-900" : "bg-white"}`}>
      <h2 className={`text-lg p-6 font-bold mb-4 text-center ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
        {t.reportTitle}
      </h2>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
}
