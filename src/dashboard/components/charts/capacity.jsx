// src/components/DashboardCharts.jsx
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import Loading from '../Loading'



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
    }, 4000); // نیم‌ثانیه تاخیر برای زیبایی

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
  
        <div className="p-6 transition-all duration-700 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Capacity Utilization</h2>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={250}/>
        </div>
  );
});
