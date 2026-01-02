import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/Loading";
import { useLanguage } from "../../../Provider/LanguageContext";

const limitToTen = (data) => data.slice(0, 10);

const financialData = limitToTen([
  { item: "Raw Material", type: "Purchase", amount: "$1200", date: "2025-10-25", status: "Completed" },
  { item: "Utility Bill", type: "Expense", amount: "$450", date: "2025-10-24", status: "Pending" },
  { item: "Product Sale", type: "Sale", amount: "$3200", date: "2025-10-25", status: "Completed" },
]);

const supplierData = limitToTen([
  { supplier: "Supplier A", paid: "$500", remaining: "$700", dueDate: "2025-11-01" },
  { supplier: "Supplier B", paid: "$1000", remaining: "$0", dueDate: "2025-10-30" },
]);

const downtimeData = limitToTen([
  { machine: "Machine 1", start: "08:00", end: "09:30", duration: "1.5 hrs", reason: "Maintenance" },
  { machine: "Machine 2", start: "10:15", end: "10:45", duration: "0.5 hrs", reason: "Setup" },
]);

const productionData = limitToTen([
  { product: "Product A", daily: 120, weekly: 750, monthly: 3000 },
  { product: "Product B", daily: 150, weekly: 900, monthly: 3600 },
  { product: "Product C", daily: 200, weekly: 1200, monthly: 4800 },
]);

export default function DashboardTables() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t ,darkmode} = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-white shadow-md rounded-xl">
        <Loading />
      </div>
    );
  }

  const DashboardTable = ({ title, headers, rows }) => (
    <section className={`w-full transition-transform transform shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1 ${darkmode?"bg-gray-900":"hover:bg-blue-50"}`}>
      <header className="flex flex-col px-4 py-3 border-b border-gray-200 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-base font-semibold text-gray-400 sm:text-lg">{title}</h2>
        <p className="mt-1 text-xs text-gray-500 sm:mt-0 sm:text-sm">
          Updated: {new Date().toLocaleDateString()}
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-gray-700 divide-y divide-gray-200 sm:text-sm">
          <thead className= {`${darkmode?"bg-gray-800 text-gray-300":"bg-gray-100"} text-center`}>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-3 py-2 font-medium text-center whitespace-nowrap sm:px-4 sm:py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className={`transition-colors duration-150  ${darkmode?"hover:bg-gray-800":"hover:bg-gray-50"}`}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-3 py-2 text-center text-gray-400 whitespace-nowrap sm:px-4 sm:py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </section>
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <DashboardTable
        title={t.financialTransactions}
        headers={[t.item, t.type, t.amount, t.date, t.status]}
        rows={financialData.map((r) => [r.item, r.type, r.amount, r.date, r.status])}
      />
      <DashboardTable
        title={t.supplierPayments}
        headers={[t.supplier, t.paid, t.remaining, t.dueDate]}
        rows={supplierData.map((r) => [r.supplier, r.paid, r.remaining, r.dueDate])}
      />
      <DashboardTable
        title={t.downtimeDetails}
        headers={[t.machine, t.startTime, t.endTime, t.duration, t.reason]}
        rows={downtimeData.map((r) => [r.machine, r.start, r.end, r.duration, r.reason])}
      />
      <DashboardTable
        title={t.productionReport}
        headers={[t.product, t.daily, t.weekly, t.monthly]}
        rows={productionData.map((r) => [r.product, r.daily, r.weekly, r.monthly])}
      />
    </div>
  );
}
