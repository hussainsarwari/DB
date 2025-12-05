import React, { useState, useEffect } from "react";
import { useLanguage } from "../../Provider/LanguageContext";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function AddNewProduct({ onClose, onSave }) {
  const {  darkmode, t } = useLanguage(); // t یک آبجکت با دسترسی نقطه‌ای

  const groupOptions = [t.groups.food, t.groups.beverage, t.groups.cleaning, t.groups.electronics];
  const unitOptions = [t.units.kg, t.units.liters, t.units.pieces, t.units.box, t.units.meter, t.units.pack];

  const materialOptions = [
    { name: "Flour", price: 20 },
    { name: "Sugar", price: 15 },
    { name: "Oil", price: 30 },
    { name: "Water", price: 5 },
    { name: "Salt", price: 10 },
    { name: "Plastic", price: 25 },
    { name: "Label", price: 8 },
  ];

  const [product, setProduct] = useState({
    name: "",
    group: "",
    unit: "",
    costPrice: 0,
    sellingPrice: "",
    materials: [{ name: "", qty: "", unit: "" }],
  });

  const handleChange = (key, value) => setProduct(prev => ({ ...prev, [key]: value }));

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...product.materials];
    newMaterials[index][field] = value;
    setProduct(prev => ({ ...prev, materials: newMaterials }));
  };

  const addMaterial = () => setProduct(prev => ({
    ...prev,
    materials: [...prev.materials, { name: "", qty: "", unit: "" }]
  }));

  const removeMaterial = (index) => setProduct(prev => ({
    ...prev,
    materials: prev.materials.filter((_, i) => i !== index)
  }));

  useEffect(() => {
    const total = product.materials.reduce((sum, m) => {
      const mat = materialOptions.find(x => x.name === m.name);
      return mat && m.qty ? sum + mat.price * parseFloat(m.qty || 0) : sum;
    }, 0);
    setProduct(prev => ({ ...prev, costPrice: total.toFixed(2) }));
  }, [product.materials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.group || !product.unit) {
      Swal.fire({
        icon: "warning",
        title: t.fillAllFields,
        background: darkmode ? "#1F2937" : "#fff",
        color: darkmode ? "#fff" : "#000",
      });
      return;
    }

    onSave(product);
    onClose();

    Swal.fire({
      icon: "success",
      title: t.productAdded,
      timer: 1500,
      showConfirmButton: false,
      background: darkmode ? "#1F2937" : "#fff",
      color: darkmode ? "#fff" : "#000",
    });
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-md bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className={`w-full max-w-lg p-6 mx-auto rounded-2xl  overflow-auto max-h-[90vh] ${darkmode ? "bg-gray-900" : "bg-white"}`}
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25 }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${darkmode ? "text-gray-100" : "text-gray-800"}`}>{t.addProduct}</h2>
            <button onClick={onClose} className={`p-2 transition rounded-full hover:${darkmode ? "bg-gray-700" : "bg-gray-200"}`}>
              <X size={20} className={darkmode ? "text-gray-300" : "text-gray-600"} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Product Name & Group */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">{t.productName}</label>
                <input type="text" value={product.name} onChange={e => handleChange("name", e.target.value)}
                  className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} required />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">{t.group}</label>
                <select value={product.group} onChange={e => handleChange("group", e.target.value)}
                  className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} required>
                  <option value="">{t.select}</option>
                  {groupOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Unit */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">{t.unit}</label>
              <select value={product.unit} onChange={e => handleChange("unit", e.target.value)}
                className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} required>
                <option value="">{t.select}</option>
                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            {/* Materials */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>{t.rawMaterials}</h3>
                <button type="button" onClick={addMaterial} className="flex items-center gap-1 px-2 py-1 text-blue-600 transition bg-blue-100 rounded-md hover:bg-blue-200">
                  <Plus size={14}/> {t.add}
                </button>
              </div>

              {product.materials.map((m, idx) => (
                <motion.div key={idx} className="flex flex-col items-center gap-2 sm:flex-row" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  <select value={m.name} onChange={e => handleMaterialChange(idx, "name", e.target.value)}
                    className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                    <option value="">{t.selectMaterial}</option>
                    {materialOptions.map(mat => <option key={mat.name} value={mat.name}>{mat.name} ({mat.price}$)</option>)}
                  </select>

                  <input type="number" value={m.qty} onChange={e => handleMaterialChange(idx, "qty", e.target.value)}
                    placeholder={t.placeholders.quantity}
                    className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} />

                  <select value={m.unit} onChange={e => handleMaterialChange(idx, "unit", e.target.value)}
                    className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                    <option value="">{t.unit}</option>
                    {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>

                  <button type="button" onClick={() => removeMaterial(idx)}
                    className="p-2 text-red-500 transition rounded-md hover:bg-red-100 dark:hover:bg-red-700">
                    <Trash2 size={16}/>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Cost Price */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">{t.autoCostPrice}</label>
              <input type="text" value={product.costPrice} readOnly className={`p-2  border rounded-lg   ${darkmode?" text-gray-200 bg-gray-700":"bg-gray-100"}`} />
            </div>

            {/* Selling Price */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">{t.sellingPrice}</label>
              <input type="number" value={product.sellingPrice} onChange={e => handleChange("sellingPrice", e.target.value)}
                placeholder={t.placeholders.examplePrice} className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <motion.button type="button" onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${darkmode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                <X size={16}/> {t.cancel}
              </motion.button>

              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 text-white transition rounded-lg ${darkmode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}>
                <Save size={16}/> {t.save}
              </motion.button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
