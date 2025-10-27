import React from 'react';

export default function HomePageControls  ({ onFilter, onReset }) {
  return (
    <div className="flex flex-col gap-4 p-4 mt-6 bg-white shadow-md rounded-xl sm:flex-row sm:items-center sm:justify-between">
      {/* فیلتر تاریخ */}
      <div className="flex items-center gap-2">
        <label className="font-medium text-gray-600">از تاریخ:</label>
        <input type="date" className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        <label className="font-medium text-gray-600">تا تاریخ:</label>
        <input type="date" className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
      </div>

    

      {/* دکمه‌ها */}
      <div className="flex items-center gap-2">
        <button
          onClick={onFilter}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          اعمال فیلتر
        </button>
      
      
      </div>
    </div>
  );
};
