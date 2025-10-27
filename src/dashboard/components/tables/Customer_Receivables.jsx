import React, { useEffect, useState } from "react";
import Loading from '../Loading'
const customerData = [
  { customer: "Customer X", total: "$2000", paid: "$1500", remaining: "$500", dueDate: "2025-10-28" },
  { customer: "Customer Y", total: "$3000", paid: "$2000", remaining: "$1000", dueDate: "2025-10-30" },
];
export default React.memo(function CustomerReceivables(){
     const [isLoaded, setIsLoaded] = useState(false);
    
      useEffect(() => {
        // شبیه‌سازی لود شدن دیتا از سرور
        const timer = setTimeout(() => {
          setIsLoaded(true);
        }, 5000); // نیم‌ثانیه تاخیر برای زیبایی
    
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
        <>
        
                {/* Customer Receivables Table */}
                <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl transition-all duration-700">
                  <h2 className="py-5 mb-4 text-xl font-bold text-center">Customer Receivables</h2>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-gray-700">Customer</th>
                        <th className="px-6 py-3 text-left text-gray-700">Total</th>
                        <th className="px-6 py-3 text-left text-gray-700">Paid</th>
                        <th className="px-6 py-3 text-left text-gray-700">Remaining</th>
                        <th className="px-6 py-3 text-left text-gray-700">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {customerData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4">{row.customer}</td>
                          <td className="px-6 py-4">{row.total}</td>
                          <td className="px-6 py-4">{row.paid}</td>
                          <td className="px-6 py-4">{row.remaining}</td>
                          <td className="px-6 py-4">{row.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
        
        
        </>
    )
})