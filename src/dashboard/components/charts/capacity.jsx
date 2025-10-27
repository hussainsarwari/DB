// src/components/DashboardCharts.jsx
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from '../Loading'
const productionData = [
  { product: "Product A", daily: 120, weekly: 750, monthly: 3000 },
  { product: "Product B", daily: 150, weekly: 900, monthly: 3600 },
  { product: "Product C", daily: 200, weekly: 1200, monthly: 4800 },
  { product: "Product D", daily: 180, weekly: 1100, monthly: 4500 },
  { product: "Product E", daily: 170, weekly: 1000, monthly: 4200 },
];

const customerData = [
  { customer: "Customer X", total: "$2000", paid: "$1500", remaining: "$500", dueDate: "2025-10-28" },
  { customer: "Customer Y", total: "$3000", paid: "$2000", remaining: "$1000", dueDate: "2025-10-30" },
];

const gaugeSeries = [76];
const gaugeOptions = {
  chart: { id: "gauge-chart", toolbar: { show: false } },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { margin: 15, size: "70%" },
      dataLabels: { name: { show: true }, value: { fontSize: "20px", show: true, formatter: (val) => `${val}%` } },
    },
  },
  colors: ["#3B82F6"],
  labels: ["Capacity"],
};

export default React.memo(function Capacity() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // شبیه‌سازی لود شدن دیتا از سرور
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // نیم‌ثانیه تاخیر برای زیبایی

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-lg font-semibold text-gray-500 animate-pulse">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-all duration-700 ease-in-out opacity-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Production Table */}
        <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl transition-all duration-700">
          <h2 className="py-3 mb-4 text-xl font-bold text-center">Production Report</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-gray-700">Daily</th>
                <th className="px-6 py-3 text-left text-gray-700">Weekly</th>
                <th className="px-6 py-3 text-left text-gray-700">Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productionData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">{row.product}</td>
                  <td className="px-6 py-4">{row.daily}</td>
                  <td className="px-6 py-4">{row.weekly}</td>
                  <td className="px-6 py-4">{row.monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Receivables Table */}
        <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl transition-all duration-700">
          <h2 className="py-5 mb-4 text-xl font-bold text-center">Customer Receivables</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-gray-700">Total</th>
                <th className="px-6 py-3 text-left text-gray-700">Paid</th>
                <th className="px-6 py-3 text-left text-gray-700">Remaining</th>
                <th className="px-6 py-3 text-left text-gray-700">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customerData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">{row.customer}</td>
                  <td className="px-6 py-4">{row.total}</td>
                  <td className="px-6 py-4">{row.paid}</td>
                  <td className="px-6 py-4">{row.remaining}</td>
                  <td className="px-6 py-4">{row.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gauge Chart */}
        <div className="p-6 transition-all duration-700 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Capacity Utilization</h2>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={250} />
        </div>

      </div>
    </div>
  );
});
