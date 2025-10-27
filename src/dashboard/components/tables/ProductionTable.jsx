
import React, { useEffect, useState } from "react";
import Loading from '../Loading'


const productionData = [
  { product: "Product A", daily: 120, weekly: 750, monthly: 3000 },
  { product: "Product B", daily: 150, weekly: 900, monthly: 3600 },
  { product: "Product C", daily: 200, weekly: 1200, monthly: 4800 },
  { product: "Product D", daily: 180, weekly: 1100, monthly: 4500 },
  { product: "Product E", daily: 170, weekly: 1000, monthly: 4200 },
];
export default  React.memo( function ProductionTable(){

    const [isLoaded, setIsLoaded] = useState(false);
        
          useEffect(() => {
            // شبیه‌سازی لود شدن دیتا از سرور
            const timer = setTimeout(() => {
              setIsLoaded(true);
            }, 7000); // نیم‌ثانیه تاخیر برای زیبایی
        
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
    
    
        {/* Production Table */}
        <div className="p-4 overflow-auto bg-white shadow-md h-[350px] rounded-xl transition-all duration-700">
          <h2 className="py-3 mb-4 text-xl font-bold text-center">Production Report</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-gray-700">Daily</th>
                <th className="px-6 py-3 text-left text-gray-700">Weekly</th>
                <th className="px-6 py-3 text-left text-gray-700">Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productionData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4">{row.product}</td>
                  <td className="px-6 py-4">{row.daily}</td>
                  <td className="px-6 py-4">{row.weekly}</td>
                  <td className="px-6 py-4">{row.monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></>
)
})