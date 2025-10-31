import React, { useState, useEffect } from "react";
import { useLanguage } from "../Provider/LanguageContext";
import Header from "../component/header/header";
import Sidebar from "../component/sidebar/sidebar";
import Loading from "../component/loading/react_loader_spinner";
import KPIcard from "./component/KPIcard";
import Filters from "./component/Fillters";
import ProductionDetailTable from "./component/costTable";
import CostChart from "./component/costchart";
import InitiaProduct from './component/initialProduct'
import ProductionProgress from "../component/ProductionProgress";

export default function Dashboard() {
  const { darkmode, dir, mobileMenuOpen, setMobileMenuOpen ,t} = useLanguage();

  const [loading, setLoading] = useState(true);

  // داده‌های فرضی برای KPI
  const kpis = [
   { title: t.kpis.dailyProduction, value: 1200 },
    { title: t.kpis.materialUsed, value: 4500 },
    { title: t.kpis.laborEfficiency, value: 87 },
    { title: t.kpis.energyCost, value: 3000 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex h-screen relative ${
      darkmode ? "bg-[#06131e] text-gray-100" : "bg-gray-50"
      } ${dir}`}
    >
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-30 ${
            darkmode ? "bg-gray-300/40" : "bg-black/40"
          } lg:hidden`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="relative flex-1 overflow-y-auto">
          <Header />

          {loading && (
            <div
              className={`absolute inset-0 z-50 flex items-center justify-center ${
                darkmode ? "bg-gray-900/70" : "bg-gray-100/70"
              }`}
            >
              <Loading />
            </div>
          )}

          {!loading && (
            <div className="flex flex-col gap-6 p-5">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, idx) => (
                  <KPIcard
                    key={idx}
                    title={kpi.title}
                    value={kpi.value}
                    darkmode={darkmode}
                  />
                ))}
              </div>


 <ProductionProgress />
              {/* Filters */}
              <Filters />

              {/* Production Charts */}
            
              <InitiaProduct />

              {/* Tables */}

              <ProductionDetailTable />

              {/* cost chart */}
              
              <CostChart />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
