import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import Loading from '../Loading';
import { useLanguage } from '../../../Provider/LanguageContext';

export default React.memo(function Capacity() {
  const { t,darkmode } = useLanguage(); // گرفتن ترجمه‌ها از کانتکست
  const [isLoaded, setIsLoaded] = useState(false);

  const gaugeSeries = [76];
  const gaugeOptions = {
    chart: { id: "gauge-chart", toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { margin: 15, size: "70%" },
        dataLabels: { 
          name: { show: true },
          value: { fontSize: "20px", show: true, formatter: (val) => `${val}%` } 
        },
      },
    },
    colors: ["#3B82F6"],
    labels: [t.capacityLabel], // استفاده از ترجمه
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 7000);
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
    <div className={`p-6 transition-all duration-700  shadow-2xl rounded-xl ${darkmode? "bg-gray-900":"bg-white"}`}>
      <h2 className={`mb-4 text-xl font-bold text-center ${darkmode?"text-gray-400":"gray-800"}`}>{t.inventryCapacity}</h2>
      <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={250}/>
    </div>
  );
});
