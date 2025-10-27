import React, { useEffect, useState } from "react";
import Loading from '../Loading'
import Chart from "react-apexcharts";
const donutSeries = [44, 33, 23];
const donutOptions = {
  labels: ["Product X", "Product Y", "Product Z"],
  colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
  legend: { position: "bottom" },
  tooltip: { y: { formatter: (val) => `${val}%` } },
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
                      {/* <Loading /> */}
          </div>
        );
      }
    
    return(
              <div className="p-6 bg-white shadow-md rounded-xl">
                <h2 className="mb-4 text-xl font-bold">Product Share</h2>
                <Chart options={donutOptions} series={donutSeries} type="donut" height={250} />
              </div>
      
    )
      
})