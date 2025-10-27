import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { LifeLine } from "react-loading-indicators";
const lineSeries = [{ name: "Production (Units)", data: [120, 150, 170, 140, 180, 200, 185] }];
const lineOptions = {
  chart: { id: "line-chart", toolbar: { show: true }, zoom: { enabled: true } },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  stroke: { curve: "smooth", width: 3 },
  colors: ["#3B82F6"],
  grid: { borderColor: "#E5E7EB" },
  tooltip: { y: { formatter: (val) => `${val} units` } },
  dataLabels: { enabled: false },
};
export default  React.memo(function ProductionChart() {
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
                   <LifeLine color="#31a4cc" size="small" text="Loading..." textColor="#65b3d7" />
          </div>
        );
      }
    
    return(

        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-bold">Weekly Production</h2>
          <Chart options={lineOptions} series={lineSeries} type="line" height={250} />
        </div>
    )
      
})