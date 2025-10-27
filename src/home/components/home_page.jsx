import React, { lazy } from "react";
import Homepagefillter from "./Homepagefillter";
import HomePageCard from "./homePageCard";
import ProductionProgress from "./ProductionProgress";

// 🔹 Lazy load همه‌ی کامپوننت‌های سنگین
const CapacityChart = lazy(() => import("./charts/capacity"));
const InventoryTrend = lazy(() => import("./charts/inventry_trend"));
const MaterialConsumptionChart = lazy(() =>
  import("./charts/Material_Consumptionchart")
);
const Expenses = lazy(() => import("./charts/expenses"));
const MultiProduction = lazy(() => import("./charts/multi_production"));
const DashboardTables = lazy(() => import("./tables/homeTable"));
const CustomerReceivables = lazy(() => import("./tables/Customer_Receivables"));
const ProductionTable = lazy(() => import("./tables/ProductionTable"));

export default React.memo(function HomePage() {
  return (
    <div className="flex flex-col min-h-screen gap-8 p-6 text-gray-700 bg-gray-50 print-area">
      {/* بخش فیلتر و کارت‌ها */}
          <ProductionProgress />
      <Homepagefillter />
       

     
      <HomePageCard /> 
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CapacityChart />
        <CustomerReceivables />

        <InventoryTrend />
        <MaterialConsumptionChart />
        <Expenses />
 

        <MultiProduction />


      </div>
        <ProductionTable />
    
        <DashboardTables />
    </div>
  );
});
