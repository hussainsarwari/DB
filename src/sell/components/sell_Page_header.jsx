import { useState } from "react";
import { useLanguage } from "../../Provider/LanguageContext";
import { History, RotateCcw, Archive } from "lucide-react";
import SalesHistoryFull from "./sell_history_model"; // کامپوننت تاریخچه فروش

export default function SellPageHeader() {
  const { darkmode } = useLanguage();
  const [activePage, setActivePage] = useState("main"); // main = صفحه اصلی فروش

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className={`px-6 py-4`}>
        <div className="flex flex-col justify-end gap-3 md:items-center md:flex-row">
          {/* Sales History */}
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer 
            ${
              darkmode
                ? "bg-gray-800 text-blue-300 hover:bg-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
            onClick={() => setActivePage("salesHistory")}
          >
            <History size={16} />
            Sales History
          </button>

          {/* Sales Return */}
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer 
            ${
              darkmode
                ? "bg-gray-800 text-blue-300 hover:bg-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
            onClick={() => setActivePage("salesReturn")}
          >
            <RotateCcw size={16} />
            Sales Return
          </button>

          {/* Sales Return History */}
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer 
            ${
              darkmode
                ? "bg-gray-800 text-blue-300 hover:bg-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
            onClick={() => setActivePage("returnHistory")}
          >
            <Archive size={16} />
            Sales Return History
          </button>
        </div>
      </div>

      {/* Render Pages */}
      <div className="px-6">
        {activePage === "main" && (
        <></>
        )}

        {activePage === "salesHistory" && (
          <SalesHistoryFull onClose={()=>setActivePage("main")} /> // نمایش کامپوننت SalesHistoryFull
        )}

        {activePage === "salesReturn" && (
          <div className={`p-4 ${darkmode ? "text-gray-100" : "text-gray-800"}`}>
            <h2 className="text-lg font-semibold">Sales Return Page (Soon)</h2>
          </div>
        )}

        {activePage === "returnHistory" && (
          <div className={`p-4 ${darkmode ? "text-gray-100" : "text-gray-800"}`}>
            <h2 className="text-lg font-semibold">Sales Return History Page (Soon)</h2>
          </div>
        )}
      </div>
    </div>
  );
}
