import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

const customerData = [
  { customer: "Customer X", total: "$2000", paid: "$1500", remaining: "$500", dueDate: "2025-10-28" },
  { customer: "Customer Y", total: "$3000", paid: "$2000", remaining: "$1000", dueDate: "2025-10-30" },
  { customer: "Customer Z", total: "$2500", paid: "$1800", remaining: "$700", dueDate: "2025-11-01" },
];

export default React.memo(function CustomerReceivables() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage(); // گرفتن ترجمه‌ها از Context

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[350px] sm:h-[400px]">
        <Loading text={t.loading} />
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl p-0 mx-auto overflow-y-auto sm:p-6 lg:p-0 h-[300px] shadow-md">
      <div className="overflow-hidden transition-all duration-700 bg-white shadow-md rounded-xl">
        {/* Header */}
        <header className="flex flex-col px-4 py-5 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="text-lg font-semibold text-center text-gray-800 sm:text-xl sm:text-left">
            {t.customerReceivables}
          </h2>
          <p className="mt-2 text-sm text-center text-gray-500 sm:text-right sm:mt-0">
            {t.updated}: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sm:text-sm">
              <tr>
                <th className="px-4 py-3 sm:px-6 whitespace-nowrap">{t.customer}</th>
                <th className="px-4 py-3 sm:px-6 whitespace-nowrap">{t.total}</th>
                <th className="px-4 py-3 sm:px-6 whitespace-nowrap">{t.paid}</th>
                <th className="px-4 py-3 sm:px-6 whitespace-nowrap">{t.remaining}</th>
                <th className="px-4 py-3 sm:px-6 whitespace-nowrap">{t.dueDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customerData.map((row, idx) => (
                <tr key={idx} className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800 sm:px-6">{row.customer}</td>
                  <td className="px-4 py-3 sm:px-6">{row.total}</td>
                  <td className="px-4 py-3 text-green-600 sm:px-6">{row.paid}</td>
                  <td className="px-4 py-3 text-red-500 sm:px-6">{row.remaining}</td>
                  <td className="px-4 py-3 text-gray-500 sm:px-6">{row.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <footer className="px-4 py-4 text-sm text-center text-gray-500 sm:px-6 bg-gray-50 sm:text-right">
          {t.showing} {customerData.length} {t.customer}
        </footer>
      </div>
    </section>
  );
});
