import React, { useEffect, useState } from "react";
import Loading from "../Loading";
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
  const { t } = useLanguage();

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
    <div className="p-4 overflow-auto transition-all duration-700 bg-white shadow-md rounded-xl h-[440px]">
      <h2 className="py-3 mb-4 text-xl font-bold text-center text-gray-800">
        {t.productionReport}
      </h2>
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700">{t.product}</th>
            <th className="px-4 py-2 text-left text-gray-700">{t.daily}</th>
            <th className="px-4 py-2 text-left text-gray-700">{t.weekly}</th>
            <th className="px-4 py-2 text-left text-gray-700">{t.monthly}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {productionData.map((row, idx) => (
            <tr key={idx} className="hover:bg-blue-50">
              <td className="px-4 py-2">{row.product}</td>
              <td className="px-4 py-2">{row.daily}</td>
              <td className="px-4 py-2">{row.weekly}</td>
              <td className="px-4 py-2">{row.monthly}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
