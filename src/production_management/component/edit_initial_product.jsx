import React, { useState } from "react";
import { useLanguage } from "../../Provider/LanguageContext";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function EditInitialProduct({ product, onClose, onSave }) {
  const { darkmode, t } = useLanguage(); // t یک آبجکت چندزبانه

  const groupOptions = [t.groups.food, t.groups.beverage, t.groups.cleaning, t.groups.electronics];
  const unitOptions = [t.units.kg, t.units.liters, t.units.pieces, t.units.box];
  const materialOptions = [t.Materials.flour, t.Materials.sugar, t.Materials.oil, t.Materials.water, t.Materials.salt, t.Materials.plastic, t.Materials.label];
  const materialUnitOptions = [t.units.kg, t.units.gram, t.units.liter, t.units.meter, t.units.piece, t.units.box, t.units.pack];

  const [editedProduct, setEditedProduct] = useState({
    ...product,
    materials:
      product.materials ||
      Array.from({ length: 1 }, () => ({ name: "", qty: "", unit: "" })),
  });

  const handleChange = (key, value) => setEditedProduct(prev => ({ ...prev, [key]: value }));

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...editedProduct.materials];
    newMaterials[index][field] = value;
    setEditedProduct(prev => ({ ...prev, materials: newMaterials }));
  };

  const addMaterial = () => setEditedProduct(prev => ({
    ...prev,
    materials: [...prev.materials, { name: "", qty: "", unit: "" }]
  }));

  const removeMaterial = (index) => setEditedProduct(prev => ({
    ...prev,
    materials: prev.materials.filter((_, i) => i !== index)
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProduct = { ...editedProduct };

    editedProduct.materials.forEach((m, i) => {
      finalProduct[`material${i + 1}`] = m.name;
      finalProduct[`material${i + 1}Qty`] = `${m.qty}${m.unit || ""}`;
    });
    delete finalProduct.materials;

    onSave(finalProduct);
    onClose();

    Swal.fire({
      icon: "success",
      title: t.saved,
      timer: 1500,
      showConfirmButton: false,
      background: darkmode ? "#1F2937" : "#fff",
      color: darkmode ? "#fff" : "#000",
    });
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25 }}
          className={`w-full max-w-lg p-6 mx-auto rounded-2xl shadow-md overflow-auto max-h-[90vh] ${darkmode ? "bg-gray-900" : "bg-white"}`}>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${darkmode ? "text-gray-100" : "text-gray-800"}`}>
              {t.editProduct}
            </h2>
            <button onClick={onClose} className={`p-2 transition rounded-full hover:${darkmode ? "bg-gray-700" : "bg-gray-200"}`}>
              <X size={20} className={darkmode ? "text-gray-300" : "text-gray-600"} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Product Name & Group */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col">
                <label className={`mb-1 font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
                  {t.productName}
                </label>
                <input type="text" value={editedProduct.name || ""} onChange={e => handleChange("name", e.target.value)}
                  className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} required />
              </div>
              <div className="flex flex-col">
                <label className={`mb-1 font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
                  {t.group}
                </label>
                <select value={editedProduct.group || ""} onChange={e => handleChange("group", e.target.value)}
                  className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                  <option value="">{t.select}</option>
                  {groupOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Unit */}
            <div className="flex flex-col">
              <label className={`mb-1 font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
                {t.productUnit}
              </label>
              <select value={editedProduct.unit || ""} onChange={e => handleChange("unit", e.target.value)}
                className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                <option value="">{t.select}</option>
                {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {["costPrice", "sellingPrice"].map((key, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className={`mb-1 font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
                    {key === "costPrice" ? t.costPrice : t.sellingPrice}
                  </label>
                  <input type="text" value={editedProduct[key] || ""} onChange={e => handleChange(key, e.target.value)}
                    className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} />
                </div>
              ))}
            </div>

            {/* Materials */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${darkmode ? "text-gray-200" : "text-gray-700"}`}>
                  {t.rawMaterials}
                </h3>
                <button type="button" onClick={addMaterial} className="flex items-center gap-1 px-2 py-1 text-blue-600 transition bg-blue-100 rounded-md hover:bg-blue-200">
                  <Plus size={14} /> {t.add}
                </button>
              </div>

              {editedProduct.materials.map((m, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  className="grid items-center grid-cols-1 gap-2 sm:grid-cols-4">
                  <select value={m.name} onChange={e => handleMaterialChange(idx, "name", e.target.value)}
                    className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                    <option value="">{t.selectMaterial}</option>
                    {materialOptions.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                  </select>
                  <input type="text" value={m.qty} onChange={e => handleMaterialChange(idx, "qty", e.target.value)}
                    placeholder={t.placeholders.quantity}
                    className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`} />
                  <select value={m.unit} onChange={e => handleMaterialChange(idx, "unit", e.target.value)}
                    className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${darkmode ? "bg-gray-700 text-gray-100" : ""}`}>
                    <option value="">{t.unit}</option>
                    {materialUnitOptions.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                  <button type="button" onClick={() => removeMaterial(idx)}
                    className="p-2 text-red-500 transition rounded-md hover:bg-red-100 dark:hover:bg-red-700">
                    <Trash2 size={16}/>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-end gap-3 mt-4">
              <motion.button type="button" onClick={onClose} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${darkmode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                <X size={16} /> {t.cancel}
              </motion.button>

              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 text-white transition rounded-lg ${darkmode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}>
                <Save size={16} /> {t.save}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
