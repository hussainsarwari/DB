import React, { useState } from "react";
import { FiPlus, FiEdit3, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import "../components/print.css";
import { useLanguage } from "../../Provider/LanguageContext";

export default function ProductionManagement() {
  const { t,darkmode } = useLanguage();

  const [productions, setProductions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [availableProducts] = useState([
    "Product A",
    "Product B",
    "Product C",
    "Product D",
  ]);

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

  // === Helpers ===
  const calcProgress = (produced, target) =>
    Math.min(100, Math.round((produced / target) * 100));

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

    return {
      elapsed: toDaysAndHours(elapsedMs),
      remaining: toDaysAndHours(remainingMs),
    };
  };

  const checkMaterials = (productName, targetAmount) => {
    const required = requiredMaterials[productName] * targetAmount;
    const available = materialStock[productName] || 0;
    if (required > available) {
      Swal.fire({
        title: t.errorTitle,
        text: `${t.notEnoughMaterial} "${productName}"!`,
        icon: "error",
        confirmButtonText: t.ok,
      });
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // === Add Product ===
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
      title: t.successTitle,
      text: t.productAdded + productName + t.successfully,
      icon: "success",
      confirmButtonText: t.ok,
    });
  };

  // === Update Production ===
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = Number(form.productId.value);
    const amount = Number(form.produced.value);
    const updatedProd = productions.find((p) => p.id === id);

    setProductions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, produced: p.produced + amount } : p
      )
    );
    setShowUpdateForm(false);
    form.reset();

    Swal.fire({
      title: t.updatedTitle,
      text: t.productionFor + updatedProd.name + t.updatedSuccessfully,
      icon: "success",
      confirmButtonText: t.ok,
    });
  };

  // === Print ===
  const handleDownloadReport = () => {
    Swal.fire({
      title: t.printTitle,
      text: t.printText,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t.printConfirm,
      cancelButtonText: t.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => window.print(), 300);
      }
    });
  };

  return (
    <div className={`flex flex-col gap-6 p-4 mt-6 shadow-2xl rounded-xl sm:p-6 ${  darkmode ? "bg-gray-900 text-gray-400 " : " text-gray-700 border-blue-400 bg-[#ffffff]"}`}>
      {/* Header + Buttons */}
      <div className="flex flex-col justify-between gap-4 mb-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold text-center sm:text-left">
          {t.Production_management}
        </h2>

        <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setShowUpdateForm(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg cursor-pointer "
          >
            <FiPlus /> {t.addNewProduct}
          </button>

          <button
            onClick={() => {
              setShowUpdateForm(!showUpdateForm);
              setShowAddForm(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg cursor-pointer font-mediumtransition-colors"
          >
            <FiEdit3 /> {t.updateProduction}
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm border rounded-lg cursor-pointer font-mediumtransition-colors"
          >
            <FiDownload /> {t.printReport}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className={`p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg `}>
          {errorMessage}
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          className={`grid grid-cols-1 gap-4 p-4 rounded-xl sm:grid-cols-2 lg:grid-cols-3 ${darkmode ? "bg-gray-800 text-gray-600 ":"bg-blue-50 "}`}
        >
          <select
            name="name"
            required
            className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-800"
          >
            <option value="">{t.selectProduct}</option>
            {availableProducts.map((prod, i) => (
              <option key={i} value={prod}>
                {prod}
              </option>
            ))}
          </select>

          <input
            name="target"
            type="number"
            placeholder={t.targetPlaceholder}
            required
            className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-800"
          />
          <input
            name="startTime"
            type="datetime-local"
            required
            className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-800"
          />
          <input
            name="endTime"
            type="datetime-local"
            required
            className="p-2 border rounded-lg focus:ring-2 focus:ring-gray-800"
          />

          <button
            type="submit"
            className={`w-full col-span-1 py-2  rounded-lg  sm:col-span-2 lg:col-span-3 ${darkmode?" text-gray-300 bg-gray-950 hover:bg-gray-900":"text-white bg-blue-500 hover:bg-blue-600"}`}
          >
            {t.saveProduct}
          </button>
        </form>
      )}

      {/* Update Form */}
      {showUpdateForm && productions.length > 0 && (
        <form
          onSubmit={handleUpdate}
          className={`grid grid-cols-1 gap-4 p-4  rounded-xl sm:grid-cols-2 lg:grid-cols-3 ${darkmode?"bg-gray-900 text-gray-500":"bg-blue-50"}`}
        >
          <select
            name="productId"
            required
            className="p-2 border rounded-lg focus:ring-2 "
          >
            <option value="">{t.selectProduct}</option>
            {productions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            name="produced"
            type="number"
            placeholder={t.addProducedUnits}
            required
            className="p-2 border rounded-lg focus:ring-2 "
          />
          <button
            type="submit"
            className={`w-full col-span-1 py-2  rounded-lg  sm:col-span-2 lg:col-span-3 ${darkmode?"text-gray-500 bg-gray-950 hover:bg-gray-900":"text-white bg-blue-500 hover:bg-blue-600"}`}
          >
            {t.updateProductionBtn}
          </button>
        </form>
      )}

      {/* Table / Cards */}
      {productions.length > 0 && (
        <div className="w-full mt-6 print-area">
          {/* Desktop & Tablet */}
          <div className="hidden overflow-x-auto border shadow-sm lg:block rounded-xl">
            <table className={`min-w-full text-sm text-left  ${darkmode?"text-gray-500 bg-gray-800":"text-gray-700 bg-white"}`}>
              <thead className={`text-xs uppercase ${darkmode?"bg-gray-700 text-gray-300":"bg-white"}`}>
                <tr>
                  {Object.values(t.tableHeaders).map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 font-semibold text-center whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {productions.map((p) => {
                  const { elapsed, remaining } = calculateTimeStats(
                    p.startTime,
                    p.endTime
                  );
                  const progress = calcProgress(p.produced, p.target);

                  return (
                    <tr
                      key={p.id}
                      className="text-center transition-colors hover:bg-blue-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {p.name}
                      </td>
                      <td className="px-4 py-3">{p.produced}</td>
                      <td className="px-4 py-3">{p.target}</td>
                      <td className="px-4 py-3">
                        <div className="w-full h-3 bg-gray-200 rounded-full">
                          <div
                            className="h-3 text-[10px] text-center text-white bg-blue-500 rounded-full"
                            style={{ width: `${progress}%` }}
                          >
                            {progress}%
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(p.startTime).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(p.endTime).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{elapsed}</td>
                      <td className="px-4 py-3">{remaining}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="grid gap-5 lg:hidden">
            {productions.map((p) => {
              const { elapsed, remaining } = calculateTimeStats(
                p.startTime,
                p.endTime
              );
              const progress = calcProgress(p.produced, p.target);

              return (
                <div
                  key={p.id}
                  className="p-5 transition-transform transform bg-white border border-gray-200 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md">
                      {progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 mb-4 overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 ease-out bg-blue-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="text-sm text-gray-700 divide-y divide-gray-100">
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-600">{t.tableHeaders.produced}</span>
                      <span>
                        {p.produced} / {p.target}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-600">{t.tableHeaders.start}</span>
                      <span>{new Date(p.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-600">{t.tableHeaders.end}</span>
                      <span>{new Date(p.endTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-600">{t.tableHeaders.elapsed}</span>
                      <span>{elapsed}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-gray-600">{t.tableHeaders.remaining}</span>
                      <span>{remaining}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
