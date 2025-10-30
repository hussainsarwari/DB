import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loading from "../../component/loading/react_loader_spinner";
import { useLanguage } from "../../Provider/LanguageContext";

export default React.memo(function WeeklyProductionChart() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, darkmode } = useLanguage();

  // 🔹 داده فرضی میزان تولید در ۷ روز گذشته (واحد: عدد محصول)
  const productionData = [120, 150, 180, 160, 200, 230, 210];
  const days = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

  const series = [
    {
      name: "تولید روزانه",
      data: productionData,
    },
  ];

  const options = {
    chart: {
      id: "weekly-production",
      toolbar: { show: true },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: days,
      labels: {
        style: {
          colors: darkmode ? "#d1d5db" : "#6b7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: darkmode ? "#d1d5db" : "#6b7280",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: darkmode ? "dark" : "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#60A5FA"],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#fff"],
      strokeColors: ["#3B82F6"],
      strokeWidth: 2,
      hover: { size: 7 },
    },
    grid: {
      borderColor: darkmode ? "#374151" : "#E5E7EB",
      strokeDashArray: 3,
    },
    colors: ["#3B82F6"],
    dataLabels: { enabled: false },
    tooltip: {
      theme: darkmode ? "dark" : "light",
      y: {
        formatter: (val) => `${val} واحد`,
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div
        className={`flex items-center justify-center h-[280px] shadow-2xl rounded-xl ${
          darkmode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Loading text={t.loading || "در حال بارگذاری..."} />
      </div>
    );
  }

  return (
    <div
      className={`transition-all duration-700 shadow-2xl rounded-xl ${
        darkmode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <h2
        className={`mb-4 text-xl font-bold text-center ${
          darkmode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        میزان تولید در ۷ روز گذشته
      </h2>
      <Chart options={options} series={series} type="area" />
    </div>
  );
});
