import React, { useEffect, useState } from "react";
import Loading from '../Loading'
import Chart from "react-apexcharts";
const barSeries = [{ name: "Consumption (Kg)", data: [40, 55, 30, 70, 60] }];
const barOptions = {
  chart: { id: "bar-chart", toolbar: { show: true } },
  xaxis: { categories: ["Material A", "Material B", "Material C", "Material D", "Material E"] },
  colors: ["#60A5FA"],
  grid: { borderColor: "#E5E7EB" },
  dataLabels: { enabled: false },
};

export default  React.memo(function MaterialConsumption() {
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
          <h2 className="mb-4 text-xl font-bold">Material Consumption</h2>
          <Chart options={barOptions} series={barSeries} type="bar" height={250} />
        </div>
    )
      
})