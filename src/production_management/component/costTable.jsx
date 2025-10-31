import React, { useEffect, useState } from "react";
import Loading from "../../component/loading/react_loader_spinner";
import { useLanguage } from "../../Provider/LanguageContext";

const productionDetails = [
  { product: "Product A", productionTime: 5, rawMaterialUsed: 12, laborCount: 3, energyCost: 25, materialCost: 60, laborCost: 45 },
  { product: "Product B", productionTime: 8, rawMaterialUsed: 18, laborCount: 5, energyCost: 40, materialCost: 95, laborCost: 70 },
  { product: "Product C", productionTime: 6, rawMaterialUsed: 15, laborCount: 4, energyCost: 30, materialCost: 80, laborCost: 55 },
];

const calculateTotalCost = (item) => item.materialCost + item.laborCost + item.energyCost;

export default React.memo(function ProductionDetailTable() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { darkmode, t } = useLanguage(); // انتخاب زبان فعال

  const [dateRange] = useState({ from: "2025-10-01", to: "2025-10-29" });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center h-[400px] shadow-md rounded-xl ${darkmode ? "bg-gray-900" : "bg-white"}`}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={`p-4 transition-all duration-700 shadow-2xl rounded-xl ${darkmode ? "bg-gray-900" : "bg-white"}`}>
      <h2 className={`py-2 mb-2 text-xl font-bold text-center ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
        {t.reportTitle}
      </h2>

       <p
        className={`text-center pb-4 text-sm ${
          darkmode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {t.fromDate} <b>{dateRange.from}</b> {t.toDate} <b>{dateRange.to}</b>
      </p>

      {/* جدول دسکتاپ */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className={`${darkmode ? "bg-gray-900" : "bg-gray-100"}`}>
            <tr>
              <th className="px-4 py-2 text-center text-gray-400">{t.product}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.productionTime}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.rawMaterial}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.laborCount}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.materialCost}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.laborCost}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.energyCost}</th>
              <th className="px-4 py-2 text-center text-gray-400">{t.totalCost}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {productionDetails.map((item, idx) => (
              <tr key={idx} className={`${darkmode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-blue-50 text-gray-800"}`}>
                <td className="px-4 py-2 text-center">{t.product}</td>
                <td className="px-4 py-2 text-center">{t.productionTime}</td>
                <td className="px-4 py-2 text-center">{item.rawMaterialUsed}</td>
                <td className="px-4 py-2 text-center">{t.laborCount}</td>
                <td className="px-4 py-2 text-center">{t.materialCost}</td>
                <td className="px-4 py-2 text-center">{t.laborCost}</td>
                <td className="px-4 py-2 text-center">{t.energyCost}</td>
                <td className="px-4 py-2 font-semibold text-center">{calculateTotalCost(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کارت‌های موبایل */}
     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:hidden">
  {productionDetails.map((item, idx) => (
    <div
      key={idx}
      className={`rounded-2xl p-5 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 ${
        darkmode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h3 className="pb-2 mb-4 text-lg font-bold border-b border-gray-300">
        {item.product}
      </h3>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span>{t.productionTimeMobile}:</span>
          <b>{item.productionTime}</b>
        </li>
        <li className="flex justify-between">
          <span>{t.rawMaterialMobile}:</span>
          <b>{item.rawMaterialUsed}</b>
        </li>
        <li className="flex justify-between">
          <span>{t.workersMobile}:</span>
          <b>{item.laborCount}</b>
        </li>
        <li className="flex justify-between">
          <span>{t.materialCostMobile}:</span>
          <b>${item.materialCost}</b>
        </li>
        <li className="flex justify-between">
          <span>{t.laborCostMobile}:</span>
          <b>${item.laborCost}</b>
        </li>
        <li className="flex justify-between">
          <span>{t.energyCostMobile}:</span>
          <b>${item.energyCost}</b>
        </li>
        <li className="flex justify-between pt-3 font-semibold text-blue-500 border-t border-gray-300">
          <span>{t.totalPriceMobile}:</span>
          <span>${calculateTotalCost(item)}</span>
        </li>
      </ul>
    </div>
  ))}
</div>

    </div>
  );
});
