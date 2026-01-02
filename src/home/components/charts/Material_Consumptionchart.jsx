import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from "../../../components/loading/Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

export default React.memo(function MaterialConsumption() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t ,darkmode} = useLanguage();

  const barSeries = [{ name: t.consumptionKg, data: [40, 55, 30, 70, 60] }];

  const barOptions = {
    chart: {
      id: "bar-chart",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    xaxis: {
      categories: ["Material A", "Material B", "Material C", "Material D", "Material E"],
      labels: { style: { colors: "#6B7280", fontSize: "13px" } },
    },
    yaxis: { labels: { style: { colors: "#6B7280", fontSize: "12px" } } },
    colors: ["#3B82F6", "#60A5FA", "#93C5FD", "#1D4ED8", "#2563EB"],
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
        <Loading text={t.loading} />
      </div>
    );
  }

  return (
    <div className={`p-6 transition-all duration-700  shadow-md rounded-xl ${darkmode? "bg-gray-900":"bg-white"}`}>
      <h2 className={ `mb-4 text-xl font-bold  sm:text-lg ${darkmode?"text-gray-400":"text-graw-800"} text-center`}>
        {t.materialConsumption}
      </h2>
      <Chart options={barOptions} series={barSeries} type="bar" />
    </div>
  );
});
