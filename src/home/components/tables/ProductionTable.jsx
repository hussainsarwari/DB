import React, { useEffect, useState } from "react";
import Loading from "../../../component/loading/Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

const productionData = [
  { product: "Product A", daily: 120, weekly: 750, monthly: 3000 },
  { product: "Product B", daily: 150, weekly: 900, monthly: 3600 },
  { product: "Product C", daily: 200, weekly: 1200, monthly: 4800 },
  { product: "Product D", daily: 180, weekly: 1100, monthly: 4500 },
  { product: "Product E", daily: 170, weekly: 1000, monthly: 4200 },
];

export default React.memo(function ProductionTable() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t, darkmode } = useLanguage();

  // 🔹 فرضاً بازه تاریخ گزارش (می‌تونی بعداً از API بگیری)
  const [dateRange, setDateRange] = useState({
    from: "2025-10-01",
    to: "2025-10-29",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-white shadow-md rounded-xl">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`p-4 overflow-auto transition-all duration-700 shadow-2xl rounded-xl h-[460px] ${
        darkmode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* 🔹 عنوان گزارش */}
      <h2
        className={`py-2 mb-1 text-xl font-bold text-center ${
          darkmode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {t.productionReport}
      </h2>

      {/* 🔹 نمایش بازه تاریخی گزارش */}
      <p
        className={`text-center pb-4 text-sm ${
          darkmode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {t.fromDate} <b>{dateRange.from}</b> {t.toDate} <b>{dateRange.to}</b>
      </p>

      {/* 🔹 جدول گزارش */}
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className={`${darkmode ? "bg-gray-800" : "bg-gray-100"}`}>
          <tr>
            <th className="px-4 py-2 text-center text-gray-400">{t.product}</th>
            <th className="px-4 py-2 text-center text-gray-400">{t.daily}</th>
            <th className="px-4 py-2 text-center text-gray-400">{t.weekly}</th>
            <th className="px-4 py-2 text-center text-gray-400">{t.monthly}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {productionData.map((row, idx) => (
            <tr
              key={idx}
              className={`${
                darkmode ? "hover:bg-gray-500 text-gray-400" : "hover:bg-blue-50 text-gray-800"
              }`}
            >
              <td className="px-4 py-2 text-center">{row.product}</td>
              <td className="px-4 py-2 text-center">{row.daily}</td>
              <td className="px-4 py-2 text-center">{row.weekly}</td>
              <td className="px-4 py-2 text-center">{row.monthly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
