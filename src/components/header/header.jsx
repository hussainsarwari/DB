import {
  MenuIcon,
  BellIcon,
  MessageSquare,
  DollarSign,
  RefreshCcw,
  Settings,
  Save,
} from "lucide-react";
import { useLanguage } from "../../Provider/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { dir, darkmode, setMobileMenuOpen, t } = useLanguage();

  /* ---------------- Notifications ---------------- */
  const [notificationbox, setNotificationbox] = useState(false);
  const [notification] = useState(2);

  /* ---------------- Currency ---------------- */
  const [currencyModel, setCurrencyModel] = useState(false);
  const currencyRef = useRef(null);

  const [baseCurrency] = useState("USD");

  const [rates, setRates] = useState({
    USD: 1,
    AFN: 72,
  });

 


  /* ---------------- Close Currency on Outside Click ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (
        currencyRef.current &&
        !currencyRef.current.contains(e.target)
      ) {
        setCurrencyModel(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between w-full px-4 h-14 shadow-md ${dir}
      ${darkmode ? "bg-gray-900 text-gray-300" : "bg-white"}`}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`p-2 rounded-full lg:hidden ${
            darkmode ? "hover:bg-gray-800" : "hover:bg-gray-200"
          }`}
        >
          <MenuIcon size={20} />
        </button>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-3">
        {/* Notifications */}
        <div
          onClick={() => setNotificationbox(!notificationbox)}
          className={`relative p-2 rounded-full cursor-pointer ${
            darkmode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <BellIcon size={20} />
          {notification > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] rounded-full bg-blue-500 text-white">
              {notification}
            </span>
          )}
        </div>

        {notificationbox && (
          <div
            className={`absolute top-14 ${
              dir === "flex-row" ? "right-0" : "left-0"
            } w-64 h-64 p-3 rounded-xl shadow-xl overflow-auto
            ${darkmode ? "bg-gray-900" : "bg-white"}`}
          >
            <h1 className="mb-3 text-sm text-center">
              {t.notifications || "Notifications"}
            </h1>

            <ul className="space-y-2">
              <li
                className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg cursor-pointer
                ${
                  darkmode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                {t.settings || "Settings"}
                <MessageSquare size={14} />
              </li>
            </ul>
          </div>
        )}

        {/* Currency Settings */}
        <div ref={currencyRef} className="relative">
          <div
            onClick={() => setCurrencyModel(!currencyModel)}
            className={`p-2 rounded-full cursor-pointer ${
              darkmode ? "hover:bg-gray-800 " : "hover:bg-gray-100"
            }`}
          >
            <DollarSign size={20} />
          </div>

        {currencyModel && (
  <div
    className={`absolute top-14 ${
      dir === "flex-row" ? "right-0" : "left-0"
    } w-80 rounded-2xl shadow-lg z-50
    ${
      darkmode
        ? "bg-gray-900 border border-gray-800"
        : "bg-white border border-gray-100"
    }`}
  >
  

    {/* Body */}
    <div className="px-5 py-4 space-y-3">
      {Object.entries(rates).map(([code, value]) => {
        const isBase = code === baseCurrency;

        return (
          <div
            key={code}
            className={`flex items-center justify-between rounded-xl px-3 py-2 
            ${darkmode?  isBase ? "bg-gray-800" : "bg-gray-900":isBase ? "bg-gray-50 text-gray-700" : "bg-gray-50/50"}`}
          >
            {/* Currency Code */}
            <div className="flex flex-col">
              <span className="text-xs font-medium ">
                {code}
              </span>
              {isBase && (
                <span className={`text-[10px] text-gray-400`}>
                  Base currency
                </span>
              )}
            </div>

            {/* Rate */}
            <input
              type="number"
              step="0.0001"
              disabled={isBase}
              value={value}
              onChange={(e) =>
                setRates({
                  ...rates,
                  [code]: Number(e.target.value),
                })
              }
              className={`w-28 text-right text-sm rounded-lg px-2 py-1
                
            ${darkmode?  "bg-gray-800 text-gray-500" : "bg-gray-50/50"}
             focus:outline-none focus:ring-1 focus:ring-gray-200
              ${
                isBase
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  :   darkmode?  "bg-gray-900 text-gray-500" : "bg-gray-50/50"
              }`}
            />
          </div>
        );
      })}
    </div>

    {/* Footer */}
    <div className="flex gap-4 px-5 py-4 border-t border-gray-100">
      <button
        className={`cursor-pointer w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-3
         transition ${darkmode? "bg-gray-800 text-white hover:bg-gray-700":"bg-blue-600 text-white hover:bg-blue-500"}`}
      >
        <Save />
        {t.save || "Save Changes"}
      </button>
      <button
        className={`cursor-pointer w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-3
         transition ${darkmode? "bg-gray-800 text-white hover:bg-gray-700":"border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white border-1"}`}
      >
        <Settings />
        
        {t.setting || "setting"}
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </header>
  );
}
