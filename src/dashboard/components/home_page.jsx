import React, { Suspense, lazy } from "react";
import Homepagefillter from "./Homepagefillter";
import HomePageCard from "./homePageCard";
import ProductionProgress from "./ProductionProgress";
import { Skeleton } from "@/components/ui/skeleton";

// 🔹 Lazy load همه‌ی کامپوننت‌های سنگین
const CapacityChart = lazy(() => import("./charts/capacity"));
const InventoryTrend = lazy(() => import("./charts/inventry_trend"));
const MaterialConsumptionChart = lazy(() => import("./charts/Material_Consumptionchart"));
const ProductionChart = lazy(() => import("./charts/Production_chart"));
const ProductionShare = lazy(() => import("./charts/product_share"));
const MultiProduction = lazy(() => import("./charts/multi_production"));
const DashboardTables = lazy(() => import("./homeTable"));

// 🔹 Skeleton ساده برای لود نمودارها
function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

// 🔹 Skeleton ساده برای لود جدول
function TableSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-2">
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/6 h-6" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen gap-8 p-6 text-gray-700 bg-gray-50 print-area">
        {/* بخش فیلتر و کارت‌ها */}
        <Homepagefillter />
        <HomePageCard />

        {/* بخش پیشرفت تولید */}
        <ProductionProgress />

        {/* 📊 نمودارها */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Suspense fallback={<ChartSkeleton />}>
            <CapacityChart />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <InventoryTrend />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <MaterialConsumptionChart />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <ProductionChart />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <ProductionShare />
          </Suspense>

          <Suspense fallback={<ChartSkeleton />}>
            <MultiProduction />
          </Suspense>
        </div>

        {/* 🧾 جدول‌ها */}
        <Suspense fallback={<TableSkeleton />}>
          <DashboardTables />
        </Suspense>
      </div>
    </>
  );
}
