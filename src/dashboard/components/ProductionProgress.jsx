import React, { useState } from "react";
import { FiPlus, FiEdit3, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import "../components/print.css";

export default function ProductionManagement () {
  const [productions, setProductions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [availableProducts] = useState(["Product A", "Product B", "Product C", "Product D"]);
  const [materialStock, setMaterialStock] = useState({
    "Product A": 50,
    "Product B": 20,
    "Product C": 100,
    "Product D": 30,
  });

  const requiredMaterials = {
    "Product A": 5,
    "Product B": 2,
    "Product C": 10,
    "Product D": 3,
  };

  const calcProgress = (produced, target) => Math.min(100, Math.round((produced / target) * 100));

  const calculateTimeStats = (start, end) => {
    const now = new Date();
    const startTime = new Date(start);
    const endTime = new Date(end);
    const elapsedMs = Math.max(0, now - startTime);
    const remainingMs = Math.max(0, endTime - now);

    const toDaysAndHours = (ms) => {
      const totalHours = ms / (1000 * 60 * 60);
      const days = Math.floor(totalHours / 24);
      const hours = Math.floor(totalHours % 24);
      return `${days > 0 ? `${days}d ` : ""}${hours}h`;
    };

    return { elapsed: toDaysAndHours(elapsedMs), remaining: toDaysAndHours(remainingMs) };
  };

  const checkMaterials = (productName, targetAmount) => {
    const required = requiredMaterials[productName] * targetAmount;
    const available = materialStock[productName] || 0;
    if (required > available) {
      Swal.fire({
        title: "⚠️ خطا",
        text: `مواد اولیه کافی برای محصول "${productName}" موجود نیست!`,
        icon: "error",
        confirmButtonText: "باشه",
      });
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.name.value;
    const target = Number(form.target.value);
    if (!checkMaterials(productName, target)) return;

    const newProd = {
      id: productions.length + 1,
      name: productName,
      target,
      produced: 0,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
    };
    setProductions([...productions, newProd]);
    setShowAddForm(false);
    form.reset();
    Swal.fire({
      title: "✅ موفقیت",
      text: `محصول "${productName}" با موفقیت اضافه شد.`,
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Number(form.productId.value);
    const amount = Number(form.produced.value);
    const updatedProd = productions.find((p) => p.id === id);

    setProductions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, produced: p.produced + amount } : p))
    );
    setShowUpdateForm(false);
    form.reset();
    Swal.fire({
      title: "✅ بروزرسانی شد",
      text: `تولید محصول "${updatedProd.name}" با موفقیت اضافه شد.`,
      icon: "success",
      confirmButtonText: "باشه",
    });
  };
const handleDownloadReport = () => {
  Swal.fire({
    title: "آیا مایل به چاپ گزارش هستید؟",
    text: "فقط بخش جدول چاپ می‌شود.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "بله، چاپ کن",
    cancelButtonText: "لغو",
  }).then((result) => {
    if (result.isConfirmed) {
      setTimeout(() => window.print(), 300);
    }
  });
};

  return (
    <div className="flex flex-col justify-around gap-4 p-6 mt-8 bg-white shadow-md rounded-xl">

      {/* دکمه‌ها - در پرینت پنهان شوند */}
      <div className="flex flex-col justify-between mb-6 no-print sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold text-gray-800">Production Management</h2>
        <div className="flex justify-around gap-5 mt-4 space-x-3 sm:mt-0 m-9">
          <button
            onClick={() => { setShowAddForm(!showAddForm); setShowUpdateForm(false); }}
            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition border border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50"
          >
            <FiPlus className="mr-2" /> Add New Product
          </button>

          <button
            onClick={() => { setShowUpdateForm(!showUpdateForm); setShowAddForm(false); }}
            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition border border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50"
          >
            <FiEdit3 className="mr-2" /> Update Production
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 transition border border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50"
          >
            <FiDownload className="mr-2" /> Print Report
          </button>
        </div>
      </div>

      {/* بخش قابل چاپ */}
      <div className="print-area">
        {errorMessage && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}

        {showAddForm && (
          <form
            onSubmit={handleAdd}
            className="grid gap-4 p-4 mt-4 no-print bg-blue-50 rounded-xl sm:grid-cols-2 lg:grid-cols-3"
          >
            <select name="name" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
              <option value="">Select Product</option>
              {availableProducts.map((prod, i) => (
                <option key={i} value={prod}>{prod}</option>
              ))}
            </select>

            <input name="target" type="number" placeholder="Target (units)" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
            <input name="startTime" type="datetime-local" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
            <input name="endTime" type="datetime-local" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />

            <button type="submit" className="w-full col-span-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 sm:col-span-3">
              Save Product
            </button>
          </form>
        )}

        {showUpdateForm && productions.length > 0 && (
          <form
            onSubmit={handleUpdate}
            className="grid gap-4 p-4 mt-4 no-print bg-blue-50 rounded-xl sm:grid-cols-2 lg:grid-cols-3"
          >
            <select name="productId" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
              <option value="">Select Product</option>
              {productions.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <input name="produced" type="number" placeholder="Add Produced Units" required className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="w-full col-span-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 sm:col-span-3">
              Update Production
            </button>
          </form>
        )}

        {productions.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full text-sm bg-white border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">Product</th>
                  <th className="px-4 py-2 text-left text-gray-700">Produced</th>
                  <th className="px-4 py-2 text-left text-gray-700">Target</th>
                  <th className="px-4 py-2 text-left text-gray-700">Progress</th>
                  <th className="px-4 py-2 text-left text-gray-700">Start</th>
                  <th className="px-4 py-2 text-left text-gray-700">End</th>
                  <th className="px-4 py-2 text-left text-gray-700">Elapsed</th>
                  <th className="px-4 py-2 text-left text-gray-700">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((p) => {
                  const { elapsed, remaining } = calculateTimeStats(p.startTime, p.endTime);
                  const progress = calcProgress(p.produced, p.target);
                  return (
                    <tr key={p.id} className="border-t hover:bg-blue-50">
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.produced}</td>
                      <td className="px-4 py-2">{p.target}</td>
                      <td className="px-4 py-2">
                        <div className="w-full h-4 bg-gray-200 rounded-full">
                          <div className="h-4 text-xs text-center text-white bg-blue-500 rounded-full" style={{ width: `${progress}%` }}>
                            {progress}%
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{new Date(p.startTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(p.endTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{elapsed}</td>
                      <td className="px-4 py-2">{remaining}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

