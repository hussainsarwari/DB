import React from "react";

export default function KPIcard({ title, value, darkmode }) {
  return (
    <div
      className={`p-4 rounded-2xl shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 ${
        darkmode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
