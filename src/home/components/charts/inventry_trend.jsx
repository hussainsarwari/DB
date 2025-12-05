import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from "../../../component/loading/Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

export default React.memo(function ProductionShare() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t ,darkmode} = useLanguage();

  const areaSeries = [{ name: t.inventoryUnits, data: [200, 180, 190, 170, 160, 180, 200] }];

  const areaOptions = {
    chart: { id: "area-chart", toolbar: { show: true }, zoom: { enabled: false } },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    stroke: { curve: "smooth" },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    colors: ["#3B82F6"],
    grid: { borderColor: "#E5E7EB" },
    dataLabels: { enabled: false },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center h-[250px]  shadow-md rounded-xl ${darkmode?"bg-gray-900":"bg-white"}`}>
        <Loading text={t.loading} />
      </div>
    );
  }

  return (
   <div className={`p-6 transition-all duration-700  shadow-md rounded-xl ${darkmode? "bg-gray-900":"bg-white"}`}>
      <h2 className={ `mb-4 text-xl font-bold  sm:text-lg ${darkmode?"text-gray-400":"text-graw-800"} text-center`}>
        {t.inventoryTrend}</h2>
      <Chart options={areaOptions} series={areaSeries} type="area" />
    </div>
  );
});
