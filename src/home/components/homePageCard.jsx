import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiCreditCard,
  FiPackage,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";
import { useLanguage } from "../../Provider/LanguageContext";

export default function HomePageCard() {
  const { t, lang } = useLanguage(); // گرفتن ترجمه‌ها از context
  const [summaryCards, setSummaryCards] = useState([]);
  const [detailsGroups, setDetailsGroups] = useState([]);
  const [isLoaded, setisLoaded] = useState(true);

  useEffect(() => {
    // شبیه‌سازی دریافت داده‌ها از سرور
    setTimeout(() => {
      // ۴ کارت اصلی
      const summary = [
        {
          title: t.totalPurchases,
          value: 120000,
          icon: <FiShoppingCart size={28} className="text-blue-500" />,
        },
        {
          title: t.totalPayments,
          value: 80000,
          icon: <FiDollarSign size={28} className="text-green-500" />,
        },
        {
          title: t.totalSales,
          value: 150000,
          icon: <FiTrendingUp size={28} className="text-purple-500" />,
        },
        {
          title: t.customerDebts,
          value: 30000,
          icon: <FiClock size={28} className="text-red-500" />,
        },
      ];

      // جزئیات گروه‌بندی‌شده
      const groups = [
        {
          groupTitle: t.purchaseAndPayments,
          icon: <FiShoppingCart className="text-blue-500" />,
          items: [
            { label: t.purchaseAmount, value: 50000, icon: <FiPackage /> },
            { label: t.paymentAmount, value: 30000, icon: <FiCreditCard /> },
            { label: t.supplierDebt, value: 20000, icon: <FiActivity /> },
            { label: t.remainingAmount, value: 15000, icon: <FiClock /> },
          ],
          dateRange: "1404/07/01 - 1404/07/26",
        },
        {
          groupTitle: t.salesAndCustomers,
          icon: <FiTrendingUp className="text-purple-500" />,
          items: [
            { label: t.salesAmount, value: 60000, icon: <FiPackage /> },
            { label: t.customerPayments, value: 40000, icon: <FiCreditCard /> },
            { label: t.customerRemaining, value: 20000, icon: <FiClock /> },
          ],
          dateRange: "1404/07/01 - 1404/07/26",
        },
        {
          groupTitle: t.profitAndExpense,
          icon: <FiBarChart2 className="text-green-500" />,
          items: [
            { label: t.netProfit, value: 35000, icon: <FiActivity /> },
            { label: t.grossProfit, value: 45000, icon: <FiActivity /> },
            { label: t.expenses, value: 25000, icon: <FiActivity /> },
            { label: t.finalBalance, value: 20000, icon: <FiActivity /> },
          ],
          dateRange: "1404/07/01 - 1404/07/26",
        },
      ];

      setSummaryCards(summary);
      setDetailsGroups(groups);
      setisLoaded(false);
    }, 1000);
  }, [t]); // هر وقت زبان تغییر کند، دوباره ترجمه می‌شود

  if (isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 space-y-10" dir={lang === "fa" ? "rtl" : "ltr"}>
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
        <div
          key={idx}
          className="flex flex-col gap-12 p-6 bg-white shadow-md rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {group.icon}
              <h3 className="text-xl font-bold text-center text-gray-700">
                {group.groupTitle}
              </h3>
            </div>
            <span className="text-gray-500">
              {t.dateRange}: {group.dateRange}
            </span>
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
}
