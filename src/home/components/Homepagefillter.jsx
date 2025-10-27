import React from "react";
import { useLanguage } from "../../Provider/LanguageContext";

export default function HomePageControls({ onFilter, onReset }) {
  const { t } = useLanguage();

  return (
    <div className="w-full p-4 mt-6 bg-white shadow-md rounded-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* === تاریخ‌ها === */}
        <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:items-center sm:gap-4">
          <div className="flex flex-col w-full gap-2 sm:flex-row sm:items-center sm:w-auto">
            <label
              htmlFor="startDate"
              className="text-sm font-medium text-gray-600 whitespace-nowrap"
            >
              {t.fromDate}
            </label>
            <input
              id="startDate"
              type="date"
              className="w-full sm:w-auto min-w-[160px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>

          <div className="flex flex-col w-full gap-2 sm:flex-row sm:items-center sm:w-auto">
            <label
              htmlFor="endDate"
              className="text-sm font-medium text-gray-600 whitespace-nowrap"
            >
              {t.toDate}
            </label>
            <input
              id="endDate"
              type="date"
              className="w-full sm:w-auto min-w-[160px] px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>
        </div>

        {/* === دکمه‌ها === */}
        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto sm:gap-4">
          <button
            onClick={onFilter}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            {t.applyFilter}
          </button>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg shadow hover:bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
