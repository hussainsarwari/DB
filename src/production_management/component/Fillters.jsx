import React, { useState } from "react";
import { useLanguage } from "../../Provider/LanguageContext";

// لیست محصولات از جدول تولید
const productsList = ["Product A", "Product B", "Product C"];

export default function Filters() {
  const { darkmode, t } = useLanguage();
  const [filter, setFilter] = useState({ product: "", from: "", to: "" });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filter applied:", filter);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full p-4 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6 transition-colors ${
        darkmode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      {/* Product Drop-down */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-sm font-medium md:text-base">{t.product}</label>
        <select
          name="product"
          value={filter.product}
          onChange={handleChange}
          className={`p-2 md:p-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
            darkmode ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400" : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
          }`}
        >
          <option value="">{t.selectProduct}</option>
          {productsList.map((prod, idx) => (
            <option key={idx} value={prod}>
              {prod}
            </option>
          ))}
        </select>
      </div>

      {/* From Date */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-sm font-medium md:text-base">{t.fromDate}</label>
        <input
          type="date"
          name="from"
          value={filter.from}
          onChange={handleChange}
          className={`p-2 md:p-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
            darkmode ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400" : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
          }`}
        />
      </div>

      {/* To Date */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-sm font-medium md:text-base">{t.toDate}</label>
        <input
          type="date"
          name="to"
          value={filter.to}
          onChange={handleChange}
          className={`p-2 md:p-3 rounded-md border focus:outline-none focus:ring-2 transition-colors ${
            darkmode ? "border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-400" : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
          }`}
        />
      </div>

      {/* Apply Button */}
      <div className="flex items-end w-full sm:w-auto">
        <button
          type="submit"
          className={`w-full sm:w-auto px-4 py-2 rounded-md  font-medium transition-colors ${
            darkmode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {t.applyFilter}
        </button>
      </div>
    </form>
  );
}
