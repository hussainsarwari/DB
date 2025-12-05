import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from "../../../component/loading/Loading";

import { useLanguage } from "../../../Provider/LanguageContext";

const donutSeries = [44, 33, 23];

const donutOptions = {
  labels: ["Product X", "Product Y", "Product Z"],
  colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
  legend: {
    position: "bottom",
    labels: { colors: "#6B7280", useSeriesColors: false },
  },
  tooltip: {
    y: { formatter: (val) => `${val}%` },
  },

  dataLabels: { enabled: true, formatter: (val) => `${val}%` },
  chart: {
    animations: { enabled: true, easing: "easeinout", speed: 800 },
  },
};

export default React.memo(function Expenses() {
  const [isLoaded, setIsLoaded] = useState(false);
    const { t ,darkmode} = useLanguage();

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
    <div className={`p-6 transition-all duration-700 shadow-md bg- rounded-xl hover:shadow-lg ${darkmode?"bg-gray-900":"bg-white"}`}>
      <h2 className={`mb-4 text-xl font-bold text-center sm:text-lg ${darkmode?"text-gray-400":"text-gray-800"}`}>
        {t.expensives}
      </h2>
      
      <div className="">
        <Chart options={donutOptions} series={donutSeries} type="donut" height={250} width="100%" />
      </div>
    </div>
  );
});
