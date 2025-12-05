import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from "../../../component/loading/Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

export default React.memo(function ProductionShare() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t ,darkmode} = useLanguage();

  const stackedSeries = [
    { name: "محصول ", data: [50, 60, 70, 40, 80, 90, 100] },
    { name: "محصول ", data: [30, 40, 20, 50, 30, 40, 35] },
    { name: "محصول ", data: [20, 30, 40, 50, 70, 70, 50] },
  ];

  const stackedOptions = {
    chart: { id: "stacked-line-chart", type: "line", stacked: true, toolbar: { show: true } },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 4, hover: { size: 6 } },
    xaxis: { categories: t.days, labels: { style: { colors: "#6B7280", fontSize: "13px" } } },
    yaxis: { labels: { style: { colors: "#6B7280", fontSize: "12px" } } },
    colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
    grid: { borderColor: "#E5E7EB", strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { theme: "light" },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[250px] bg-white shadow-md rounded-xl">
        <Loading />
      </div>
    );
  }

  return (
 <div className={`p-6 transition-all duration-700  shadow-md rounded-xl ${darkmode? "bg-gray-900":"bg-white"}`}>
      <h2 className={ `mb-4 text-xl font-bold  sm:text-lg ${darkmode?"text-gray-400":"text-graw-800"} text-center`}>
        {t.multiProductProduction}
      </h2>
      <div>
        <Chart options={stackedOptions} series={stackedSeries} type="line" />
      </div>
    </div>
  );
});
