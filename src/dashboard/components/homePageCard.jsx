import React from 'react';
import { FiShoppingCart, FiDollarSign, FiTrendingUp, FiClock, FiCreditCard, FiPackage, FiActivity, FiBarChart2 } from 'react-icons/fi';

export default function HomePageCard  ()  {
  // ۴ کارت اصلی
  const summaryCards = [
    { title: 'میزان خرید کل', value: 120000, icon: <FiShoppingCart size={28} className="text-blue-500" /> },
    { title: 'میزان پرداخت کل', value: 80000, icon: <FiDollarSign size={28} className="text-green-500" /> },
    { title: 'میزان فروش کل', value: 150000, icon: <FiTrendingUp size={28} className="text-purple-500" /> },
    { title: 'بدهی مشتریان', value: 30000, icon: <FiClock size={28} className="text-red-500" /> },
  ];

  // جزئیات گروه‌بندی شده
  const detailsGroups = [
    {
      groupTitle: 'خرید و پرداخت‌ها',
      icon: <FiShoppingCart className="text-blue-500" />,
      items: [
        { label: 'میزان خرید', value: 50000, icon: <FiPackage /> },
        { label: 'میزان پرداخت', value: 30000, icon: <FiCreditCard /> },
        { label: 'قرضداری تامین‌کننده', value: 20000, icon: <FiActivity /> },
        { label: 'مقدار باقی‌مانده', value: 15000, icon: <FiClock /> },
      ],
      dateRange: '1404/07/01 - 1404/07/26',
    },
    {
      groupTitle: 'فروش و مشتریان',
      icon: <FiTrendingUp className="text-purple-500" />,
      items: [
        { label: 'میزان فروش', value: 60000, icon: <FiPackage /> },
        { label: 'پرداخت مشتریان', value: 40000, icon: <FiCreditCard /> },
        { label: 'باقی‌مانده مشتریان', value: 20000, icon: <FiClock /> },
      ],
      dateRange: '1404/07/01 - 1404/07/26',
    },
    {
      groupTitle: 'مفاد و مصارف',
      icon: <FiBarChart2 className="text-green-500" />,
      items: [
        { label: 'مفاد خالص', value: 35000, icon: <FiActivity /> },
        { label: 'مفاد ناخالص', value: 45000, icon: <FiActivity /> },
        { label: 'مصارف', value: 25000, icon: <FiActivity /> },
        { label: 'بیلانس نهایی', value: 20000, icon: <FiActivity /> },
      ],
      dateRange: '1404/07/01 - 1404/07/26',
    },
  ];

  return (
    <div className="flex flex-col gap-5 space-y-10">
      {/* ۴ کارت اصلی */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-6 text-center transform bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="font-medium text-gray-600">{card.title}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* کارت جزئیات با گروه‌بندی */}
      {detailsGroups.map((group, idx) => (
        <div key={idx} className="flex flex-col gap-12 p-6 bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
          
              <h3 className="text-xl font-bold text-center text-gray-700">{group.groupTitle}</h3>
            </div>
            <span className="text-gray-500">{group.dateRange}</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {group.items.map((item, idx2) => (
              <div
                key={idx2}
                className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-medium text-gray-600">{item.label}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

