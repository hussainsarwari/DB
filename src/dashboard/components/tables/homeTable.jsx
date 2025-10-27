import React, { useEffect, useState } from "react";
import Loading from '../Loading'
// تابع کمکی برای محدود کردن داده‌ها به 10 ردیف
const limitToTen = (data) => data.slice(0, 10);

const financialData = limitToTen([
  { item: 'Raw Material', type: 'Purchase', amount: '$1200', date: '2025-10-25', status: 'Completed' },
  { item: 'Utility Bill', type: 'Expense', amount: '$450', date: '2025-10-24', status: 'Pending' },
  { item: 'Product Sale', type: 'Sale', amount: '$3200', date: '2025-10-25', status: 'Completed' },
  // بقیه داده‌ها ...
]);

const supplierData = limitToTen([
  { supplier: 'Supplier A', paid: '$500', remaining: '$700', dueDate: '2025-11-01' },
  { supplier: 'Supplier B', paid: '$1000', remaining: '$0', dueDate: '2025-10-30' },

]);





const downtimeData = limitToTen([
  { machine: 'Machine 1', start: '08:00', end: '09:30', duration: '1.5 hrs', reason: 'Maintenance' },
  { machine: 'Machine 2', start: '10:15', end: '10:45', duration: '0.5 hrs', reason: 'Setup' },
 
]);

const productionData = limitToTen([
  { product: 'Product A', daily: 120, weekly: 750, monthly: 3000 },
  { product: 'Product B', daily: 150, weekly: 900, monthly: 3600 },
  { product: 'Product C', daily: 200, weekly: 1200, monthly: 4800 },


  
]);
export default function DashboardTables ()  {
  const [isLoaded, setIsLoaded] = useState(false);
    
      useEffect(() => {
        // شبیه‌سازی تاخیر برای لود شدن داده‌ها یا آماده‌سازی نمودار
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 9000); // نیم‌ثانیه تاخیر برای جلوه‌ی بهتر
    
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
    <div className="flex flex-col gap-5 space-y-8">
      {/* Financial Transactions Table */}
      <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl hover:shadow-xl hover:-translate-y-1">
        
        <h2 className="mb-4 text-xl font-bold">Financial Transactions</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Item</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Type</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Amount</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {financialData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{row.item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Supplier Payments Table */}
      <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl hover:shadow-xl hover:-translate-y-1">
        <h2 className="mb-4 text-xl font-bold">Supplier Payments</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Supplier</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Paid</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Remaining</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {supplierData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{row.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.paid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.remaining}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {/* Downtime Table */}
      <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl hover:shadow-xl hover:-translate-y-1">
        <h2 className="mb-4 text-xl font-bold">Downtime Details</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Machine</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Start Time</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">End Time</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Duration</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {downtimeData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{row.machine}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.start}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.end}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Production Report Table */}
      <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl hover:shadow-xl hover:-translate-y-1">
        <h2 className="mb-4 text-xl font-bold">Production Report</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Product</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Daily</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Weekly</th>
              <th className="px-6 py-3 text-sm font-medium text-left text-gray-700">Monthly</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productionData.map((row, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{row.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.daily}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.weekly}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

