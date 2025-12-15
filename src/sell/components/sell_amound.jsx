import { useState, useEffect, useRef } from "react";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function SaleDetailsSection({ selectedProduct, darkMode,setTotalPurchase,items,setItems}) {
  
  const refs = useRef({});


  const unitOptions = ["عدد", "بسته", "کیلو", "گرم", "لیتر"];

  const productData = {
    Laptop: { stock: 10, costPrice: 500 },
    Smartphone: { stock: 15, costPrice: 300 },
    Headphones: { stock: 20, costPrice: 50 },
    Camera: { stock: 5, costPrice: 200 },
    Watch: { stock: 12, costPrice: 100 },
    Tablet: { stock: 8, costPrice: 250 },
    Printer: { stock: 6, costPrice: 150 },
    Monitor: { stock: 7, costPrice: 180 },
  };

  /* ---------- Utils ---------- */
  const toEnglishNumber = (text) => {
    const map = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9' };
    return text.replace(/[۰-۹]/g, w => map[w]);
  };

  useEffect(() => {
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  setTotalPurchase(total);
}, [items, setTotalPurchase]);
  useEffect(() => {
    if (!selectedProduct) return;
    const data = productData[selectedProduct];
    setItems(prev => {
      const exists = prev.find(i => i.name === selectedProduct);
      if (exists) {
        return prev.map(i =>
          i.name === selectedProduct ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: selectedProduct,
          quantity: 1,
          unitPrice: data.costPrice,
          unit: "",
          stock: data.stock,
          costPrice: data.costPrice,
          note: "",
        }
      ];
    });
  }, [selectedProduct]);

  /* ---------- Actions ---------- */
  const update = (id, field, value) => {
    if (field === "quantity" || field === "unitPrice") {
      value = Number(toEnglishNumber(value));
    }
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, [field]: value } : i)
    );
  };

  const remove = (id) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const handleKey = (e, item, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "quantity") refs.current[item.id]?.unitPrice?.focus();
      else if (field === "unitPrice") refs.current[item.id]?.unit?.focus();
      else if (field === "unit") refs.current[item.id]?.note?.focus();
      else if (field === "note") {
        document.dispatchEvent(new CustomEvent("focusProductSearch"));
      }
    }

    if ((e.key === "Backspace") && (item[field] === 0 || item[field] === "")) {
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

  /* ---------- UI ---------- */
  return (
    <div className={`${darkMode ? "bg-[#1e293b] text-white" : "bg-white text-gray-800"} p-3 rounded-xl shadow-sm`}>
      
      {/* Responsive wrapper */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-collapse table-fixed ">

          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
            <col className="w-[8%]" />
            <col className="w-[14%]" />
            <col className="w-[10%]" />
            <col className="w-[6%]" />
          </colgroup>

          <thead className="border-b">
            <tr className="font-medium text-center">
              <th className="text-left">Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Unit</th>
              <th>Stock</th>
              <th>Note</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <AnimatePresence>
            <tbody>
              {items.map(item => {
                refs.current[item.id] ??= {};
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-center transition-colors border-b last:border-none hover: focus-within:bg-gray-200"
                  >
                    <td className="z-10 font-medium text-left bg-inherit">
                      {item.name}
                    </td>

                    <td>
                      <input
                        ref={el => refs.current[item.id].quantity = el}
                        className="w-12 text-center rounded outline-none"
                        inputMode="numeric"
                        maxLength={4}
                        min={1}
                        value={item.quantity}
                        onChange={e => update(item.id, "quantity", e.target.value)}
                        onKeyDown={e => handleKey(e, item, "quantity")}
                      />
                    </td>

                    <td>
                      <input
                        ref={el => refs.current[item.id].unitPrice = el}
                        className="w-20 text-center rounded outline-none"
                        inputMode="numeric"
                        value={item.unitPrice}
                        min={1}
                        onBlur={() => checkPrice(item)}
                        onChange={e => update(item.id, "unitPrice", e.target.value)}
                        onKeyDown={e => handleKey(e, item, "unitPrice")}
                      />
                    </td>

                    <td>
                      <select
                        ref={el => refs.current[item.id].unit = el}
                        className="w-20 text-center rounded outline-none"
                        value={item.unit}
                        onChange={e => update(item.id, "unit", e.target.value)}
                        onKeyDown={e => handleKey(e, item, "unit")}
                      >
                        <option value="">واحد</option>
                        {unitOptions.map(u => <option key={u}>{u}</option>)}
                      </select>
                    </td>

                    <td>{item.stock}</td>

                    <td>
                      <textarea
                      rows={1}
                        ref={el => refs.current[item.id].note = el}
                        className="w-32 text-center rounded outline-none"
                        value={item.note}
                        placeholder="note"
                        onChange={e => update(item.id, "note", e.target.value)}
                        onKeyDown={e => handleKey(e, item, "note")}
                      />
                    </td>

                    <td className="font-semibold">{total(item)}</td>

                    <td>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-red-400 hover:text-red-600"
                      >
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

    </div>
  );
}
