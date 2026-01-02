import { useState, useEffect, useRef } from "react";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useLanguage } from "../../Provider/LanguageContext";

export default function SaleDetailsSection({
  selectedProduct,
  
  setTotalPurchase,
  items,
  setItems,
  setshowSellAmountModel,
  productData
}) {
  
  const { darkmode } = useLanguage();
  const refs = useRef({});
  const unitOptions = ["عدد", "بسته", "کیلو", "گرم", "لیتر"];

  const toEnglishNumber = (text) => {
    const map = { "۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9" };
    return text.replace(/[۰-۹]/g, (w) => map[w]);
  };

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    setTotalPurchase(total);
  }, [items, setTotalPurchase]);

  useEffect(() => {
    if (!selectedProduct) return;
    const data = productData.find(p => p.id === selectedProduct.id);
    setItems((prev) => {
      const exists = prev.find((i) => i.name === selectedProduct.name);
      if (exists) return prev.map((i) => i.name === selectedProduct.name ? { ...i, quantity: i.quantity + 1 } : i);
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: selectedProduct.name,
          quantity: 1,
          unitPrice: data.costPrice,
          unit: "",
          stock: data.stock,
          costPrice: data.costPrice,
          note: "",
        },
      ];
    });
  }, [selectedProduct]);

  const update = (id, field, value) => {
    if (field === "quantity" || field === "unitPrice") value = Number(toEnglishNumber(value));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const remove = (id) => {
    if (items.length === 1) setshowSellAmountModel(false);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleKey = (e, item, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "quantity") refs.current[item.id]?.unitPrice?.focus();
      else if (field === "unitPrice") refs.current[item.id]?.unit?.focus();
      else if (field === "unit") refs.current[item.id]?.note?.focus();
      else if (field === "note") document.dispatchEvent(new CustomEvent("focusProductSearch"));
    }
    if (e.key === "Backspace" && (item[field] === 0 || item[field] === "")) {
      e.preventDefault();
      remove(item.id);
    }
    if (e.ctrlKey && e.key.toLowerCase() === "x") {
      e.preventDefault();
      remove(item.id);
    }
  };

  const total = (i) => i.quantity * i.unitPrice;

  const checkPrice = (item) => {
    if (item.unitPrice < item.costPrice) {
      Swal.fire({
        icon: "warning",
        title: "هشدار قیمت فروش",
        text: `قیمت فروش ${item.name} کمتر از قیمت خرید است`,
        confirmButtonText: "متوجه شدم",
      });
    }
  };

  const baseInputClass = `text-center rounded outline-none w-full px-2 py-1 focus:outline-none focus:ring-1`;
  const inputClass = darkmode
    ? `${baseInputClass} bg-gray-700 text-white border border-gray-600 focus:ring-blue-500`
    : `${baseInputClass} bg-white text-gray-800 border border-gray-200 focus:ring-blue-200`;

  const cardBg = darkmode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-800 border border-gray-200";

  return (
    <div className={`${darkmode ? "text-white" : "text-gray-800"} py-5`}>
      {/* Desktop Table */}
      <div className="hidden w-full overflow-x-auto md:block">
        <table className={`w-full text-sm border-collapse lg:table-fixed ${darkmode ? "text-white" : "text-gray-800"}`}>
          <colgroup className="hidden lg:table-column-group">
            <col className="w-[50%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[5%]" />
            <col className="w-[8%]" />
            <col className="w-[14%]" />
            <col className="w-[10%]" />
            <col className="w-[6%]" />
          </colgroup>
          <thead className={`border-b   ${darkmode ? "bg-gray-800" : "bg-gray-400 text-white"}`}>
            <tr className="font-medium text-center whitespace-nowrap">
              <th className="text-left">Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Unit</th>
              <th className="hidden md:table-cell">Stock</th>
              <th className="hidden md:table-cell">Note</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {items.map((item) => {
                refs.current[item.id] ??= {};
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`text-center border-b last:border-none ${darkmode ? "lg:hover:bg-gray-700" : "lg:hover:bg-gray-200"}`}
                  >
                    <td className="font-medium text-left break-words min-w-[180px]">{item.name}</td>
                    <td>
                      <input
                        ref={(el) => (refs.current[item.id].quantity = el)}
                        className={`${inputClass} w-14 sm:w-16`}
                        inputMode="numeric"
                        value={item.quantity}
                        onChange={(e) => update(item.id, "quantity", e.target.value)}
                        onKeyDown={(e) => handleKey(e, item, "quantity")}
                      />
                    </td>
                    <td>
                      <input
                        ref={(el) => (refs.current[item.id].unitPrice = el)}
                        className={`${inputClass} w-20 sm:w-24`}
                        inputMode="numeric"
                        value={item.unitPrice}
                        onBlur={() => checkPrice(item)}
                        onChange={(e) => update(item.id, "unitPrice", e.target.value)}
                        onKeyDown={(e) => handleKey(e, item, "unitPrice")}
                      />
                    </td>
                    <td>
                      <select
                        ref={(el) => (refs.current[item.id].unit = el)}
                        className={inputClass}
                        value={item.unit}
                        onChange={(e) => update(item.id, "unit", e.target.value)}
                        onKeyDown={(e) => handleKey(e, item, "unit")}
                      >
                        <option value="">واحد</option>
                        {unitOptions.map((u) => (<option key={u}>{u}</option>))}
                      </select>
                    </td>
                    <td className="hidden md:table-cell">{item.stock}</td>
                    <td className="hidden md:table-cell">
                      <textarea
                        rows={1}
                        ref={(el) => (refs.current[item.id].note = el)}
                        className={inputClass + " resize-none w-28 lg:w-32"}
                        value={item.note}
                        placeholder="note"
                        onChange={(e) => update(item.id, "note", e.target.value)}
                        onKeyDown={(e) => handleKey(e, item, "note")}
                      />
                    </td>
                    <td className="font-semibold whitespace-nowrap">{total(item)}</td>
                    <td>
                      <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-600">
                        <XCircle size={18} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Mobile / Tablet */}
      <div className="flex flex-col gap-5 md:hidden">
        {items.map((item) => {
          refs.current[item.id] ??= {};
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className={`${cardBg} rounded-xl p-4 shadow-sm my-5`}
            >
              <div className="text-base font-semibold">{item.name}</div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-400">Qty</label>
                  <input
                    ref={(el) => (refs.current[item.id].quantity = el)}
                    className={inputClass}
                    inputMode="numeric"
                    value={item.quantity}
                    onChange={(e) => update(item.id, "quantity", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-400">Unit</label>
                  <select
                    ref={(el) => (refs.current[item.id].unit = el)}
                    className={inputClass}
                    value={item.unit}
                    onChange={(e) => update(item.id, "unit", e.target.value)}
                  >
                    <option value="">واحد</option>
                    {unitOptions.map((u) => (<option key={u}>{u}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400">Unit Price</label>
                <input
                  ref={(el) => (refs.current[item.id].unitPrice = el)}
                  className={inputClass}
                  inputMode="numeric"
                  value={item.unitPrice}
                  onBlur={() => checkPrice(item)}
                  onChange={(e) => update(item.id, "unitPrice", e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between gap-3 py-5">
                <textarea
                  ref={(el) => (refs.current[item.id].note = el)}
                  rows={1}
                  className={inputClass + " resize-none w-full"}
                  placeholder="Note:"
                  onChange={(e) => update(item.id, "note", e.target.value)}
                />
                <div className="flex flex-col items-center text-sm font-bold">{`Stock ${item.stock}`}</div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                <span className="font-semibold">{`Total: ${total(item)}`}</span>
                <button
                  onClick={() => remove(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
