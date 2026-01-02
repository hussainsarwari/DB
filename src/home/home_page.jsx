import React, { lazy, Suspense } from "react";
import Homepagefillter from "../components/Homepagefillter";
import HomePageCard from "./components/homePageCard";
import ProductionProgress from "../components/ProductionProgress";
import { useLanguage } from "../Provider/LanguageContext";

// Lazy load کامپوننت‌های سنگین
const CapacityChart = lazy(() => import("./components/charts/capacity"));
const InventoryTrend = lazy(() => import("./components/charts/inventry_trend"));
const MaterialConsumptionChart = lazy(() =>
  import("./components/charts/Material_Consumptionchart")
);
const Expenses = lazy(() => import("./components/charts/expenses"));
const MultiProduction = lazy(() => import("./components/charts/multi_production"));
const DashboardTables = lazy(() => import("./components/tables/homeTable"));
const CustomerReceivables = lazy(() => import("./components/tables/Customer_Receivables"));
const ProductionTable = lazy(() => import("./components/tables/ProductionTable"));

export default React.memo(function HomePage() {
  const { darkmode, lang } = useLanguage();

  // جهت متن و اسکرول بار بر اساس زبان
  const isRTL = lang === "fa";
  const textAlign = isRTL ? "text-right" : "text-left";
  const direction = isRTL ? "rtl" : "ltr"; // برای scrollbar

  // کلاس‌های Scrollbar با Tailwind
  const scrollClasses = darkmode
    ? "scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
    : "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200";

  return (
    <div
      dir={direction}
      className={`flex flex-col min-h-screen gap-8 p-6 transition-colors duration-500
        ${darkmode ? "bg-[#06131e] text-gray-100" : "bg-gray-50 text-gray-700"}
        ${textAlign} overflow-y-auto ${scrollClasses}`}
    >
      {/* بخش بالای صفحه */}
      <ProductionProgress />
      <Homepagefillter />
      <HomePageCard />

      {/* بخش چارت‌ها و جداول */}
      <Suspense fallback={<div className="py-20 text-center">Loading charts...</div>}>
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
      </Suspense>
    </div>
  );
});
