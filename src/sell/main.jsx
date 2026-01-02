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
  import { DotLottieReact } from '@lottiefiles/dotlottie-react';

  export default function Dashboard() {
    const { darkmode, dir, mobileMenuOpen, setMobileMenuOpen ,t} = useLanguage();
  const [activePanel, setActivePanel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [Customers, setCustomers] = useState([]);
    const [totalPurchase,setTotalPurchase] = useState(0);
    const [queryCustomer, setQueryCustomer] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showSellAmountModel,setshowSellAmountModel]=useState(false)
  const [items, setItems] = useState([]);

  const products = [
      { stock:12,  id: "12345", name: "Laptop", barcode: "1234566876876787", costPrice: 1000 },
      { stock:12,  id: "23456", name: "Smartphone", barcode: "2345678901234", costPrice: 500 },
      { stock:12,  id: "34567", name: "Headphones", barcode: "3456789012345", costPrice: 150 },
      { stock:12,  id: "45678", name: "Camera", barcode: "4567890123456", costPrice: 800 },
      { stock:12,  id: "56789", name: "Watch", barcode: "5678901234567", costPrice: 200 },
      { stock:12,  id: "67890", name: "Tablet", barcode: "6789012345678", costPrice: 400 },
      { stock:12,  id: "78901", name: "Printer", barcode: "7890123456789", costPrice: 250 },
      { stock:12,  id: "89012", name: "Monitor", barcode: "8901234567890", costPrice: 300 },
    ];


    
  const customers = [
    "Guest Customer",
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
              <div className={` block  md:flex gap-5 p-5 ${dir}`}>
              <div className="flex flex-col w-full gap-2 my-10 md:my-0">
                <div className="flex flex-col gap-4 md:flex-row">
                  
  <ChooseProduct  query={query} setQuery={setQuery} selected={selected} setSelected={setSelected}  activePanel={activePanel} setActivePanel={setActivePanel} setshowSellAmountModel={setshowSellAmountModel} products={products}/>
  <ChooseCustomer query={queryCustomer} setCustomers={setCustomers} setQuery={setQueryCustomer} selected={selectedCustomer} setSelected={setSelectedCustomer} customers={customers} activePanel={activePanel} setActivePanel={setActivePanel} />
                </div>
  {showSellAmountModel ?
  <Sell_amound selectedProduct={selected}   setTotalPurchase={setTotalPurchase} items={items} setItems={setItems} setshowSellAmountModel={setshowSellAmountModel} productData={products}/>:
  <DotLottieReact
        src="../../public/animation/No data.lottie"
        loop
        autoplay
      />
  }
              </div>
              <SidebarSales selectedcustomer={selectedCustomer} totalPurchase={totalPurchase} itemsList={items}/>
            
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
