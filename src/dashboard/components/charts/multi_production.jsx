import React, { useEffect, useState } from "react";
import Loading from '../Loading'
import Chart from "react-apexcharts";
const stackedSeries = [
  { name: "Product X", data: [50, 60, 70, 40, 80, 90, 100] },
  { name: "Product Y", data: [30, 40, 20, 50, 30, 40, 35] },
  { name: "Product Z", data: [20, 30, 40, 50, 70, 70, 50] },
];
const stackedOptions = {
  chart: { id: "stacked-bar-chart", stacked: true, toolbar: { show: true } },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
  grid: { borderColor: "#E5E7EB" },
  dataLabels: { enabled: false },
};

export default  React.memo(function ProductionShare() {
  const [isLoaded, setIsLoaded] = useState(false);
    
      useEffect(() => {
        // شبیه‌سازی تاخیر برای لود شدن داده‌ها یا آماده‌سازی نمودار
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 600); // نیم‌ثانیه تاخیر برای جلوه‌ی بهتر
    
        return () => clearTimeout(timer);
      }, []);
    
      if (!isLoaded) {
        return (
          <div className="flex items-center justify-center h-[250px] bg-white shadow-md rounded-xl">
               <Loading />
          </div>
        );
      }
    
    return(
               <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Multi-Product Production</h2>
          <Chart options={stackedOptions} series={stackedSeries} type="bar" height={250} />
        </div>
      
    )
      
})