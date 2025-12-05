import React, { useState, useEffect } from "react";
import { useLanguage } from "../Provider/LanguageContext";
import Header from "../component/header/header";
import Sidebar from "../component/sidebar/sidebar";
import Loading from "../component/loading/react_loader_spinner";
import "./components/sell_reciept.css"
import Sell_page_sidebar from './components/sell_page_sidebar';

export default function Dashboard() {
  const { darkmode, dir, mobileMenuOpen, setMobileMenuOpen ,t} = useLanguage();

  const [loading, setLoading] = useState(true);



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
            <div className={`flex p-5 ${dir}`}>
            <Sell_page_sidebar />
            <div className="flex flex-col ">

            </div>
          
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
