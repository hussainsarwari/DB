import React, { useState, useEffect } from "react";
import { useLanguage } from "../Provider/LanguageContext";
import Header from "../component/header/header";
import Sidebar from "../component/sidebar/sidebar";
import Loading from "../component/loading/react_loader_spinner";
import "./components/sell_reciept.css"
import SidebarSales from './components/sell_page_sidebar';
import ChooseProduct  from "./components/choose_product";
import ChooseCustomer from "./components/choose_customer";
import Sell_amound from "./components/sell_amound";
export default function Dashboard() {
  const { darkmode, dir, mobileMenuOpen, setMobileMenuOpen ,t} = useLanguage();
const [activePanel, setActivePanel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [totalPurchase,setTotalPurchase] = useState(0);
  const [queryCustomer, setQueryCustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
const [items, setItems] = useState([]);
  const products = [
  "Laptop",
  "Smartphone",
  "Headphones",
  "Camera",
  "Watch",
  "Tablet",
  "Printer",
  "Monitor",
];
const customers = [
  "Ali Reza",
  "Sara Ahmadi",
  "Mohammad Karimi",
  "Neda Hosseini",
  "Hassan Gholami",
  "Laleh Javadi",
  "Reza Rahimi",
  "Parisa Shams",
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
      <Sidebar  />

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
            <div className={` block  md:flex  p-5 ${dir}`}>
            <div className="flex flex-col w-full gap-5 p-3 my-10 md:my-0">
<ChooseProduct query={query} setQuery={setQuery} selected={selected} setSelected={setSelected} products={products} activePanel={activePanel} setActivePanel={setActivePanel}/>
<ChooseCustomer query={queryCustomer} setQuery={setQueryCustomer} selected={selectedCustomer} setSelected={setSelectedCustomer} customers={customers} activePanel={activePanel} setActivePanel={setActivePanel} />
<Sell_amound selectedProduct={selected}   setTotalPurchase={setTotalPurchase} items={items} setItems={setItems}/>
            </div>
            <SidebarSales selectedcustomer={selectedCustomer} totalPurchase={totalPurchase} itemsList={items}/>
          
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
