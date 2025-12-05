import React, { useState } from "react";
import { useLanguage } from "../../Provider/LanguageContext";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import EditInitialProduct from "./edit_initial_product";
import AddNewProduct from "./addinitialproduct";

export default function InitialProduct() {
  const { t, darkmode, dir } = useLanguage(); // استفاده از t

  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cooking Oil",
      group: "Food",
      stock: 120,
      unit: "Liters",
      costPrice: "$1.80",
      sellingPrice: "$2.50",
      material1: "Palm",
      material1Qty: "30kg",
      material2: "Bottle",
      material2Qty: "120pcs",
    },
  ]);

  const handleEdit = (product) => setEditingProduct(product);

  const handleSave = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleAddNew = (newProduct) => {
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const materialsData = {};
    if (Array.isArray(newProduct.materials)) {
      newProduct.materials.forEach((mat, index) => {
        materialsData[`material${index + 1}`] = mat.name || "";
        materialsData[`material${index + 1}Qty`] = mat.qty
          ? `${mat.qty}${mat.unit || ""}`
          : "";
      });
    }

    const formattedProduct = {
      id: nextId,
      name: newProduct.name,
      group: newProduct.group,
      unit: newProduct.unit,
      costPrice: `$${newProduct.costPrice}`,
      sellingPrice: newProduct.sellingPrice ? `$${newProduct.sellingPrice}` : "$0.00",
      stock: 0,
      ...materialsData,
    };

    setProducts((prev) => [...prev, formattedProduct]);
  };

  const handleDelete = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const maxMaterials = Math.max(
    ...products.map(
      (p) => Object.keys(p).filter((k) => k.startsWith("material")).length / 2
    )
  );

  return (
    <div className={`rounded-2xl shadow-md p-5 border ${darkmode ? "bg-gray-900 border-gray-900 text-gray-100" : "bg-white border-gray-100 text-gray-900"} ${dir} transition-all duration-500`}>

      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4 mb-4 md:flex-row md:justify-around" style={{margin:"20px"}}>
        <h2 className={`text-xl font-bold ${darkmode ? "text-blue-300" : "text-gray-700"}`}>
          {t.initialProductTable}
        </h2>
        <button onClick={() => setAddingProduct(true)} className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium shadow-md transition-all ${darkmode ? "bg-blue-700 hover:bg-blue-500 text-green-100" : "bg-blue-500 hover:bg-blue-600 text-gray-100"}`}>
          <PlusCircle size={16} />
          {t.addNewProduct}
        </button>
      </div>

      {/* Table Desktop */}
      <div className="hidden overflow-x-auto shadow-inner md:block rounded-xl">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className={`${darkmode ? "bg-gray-950 text-blue-100" : "bg-blue-100 text-gray-700"}`}>
              <th className="p-3 text-center border-b">ID</th>
              <th className="p-3 text-center border-b">{t.productName}</th>
              <th className="p-3 text-center border-b">{t.group}</th>
              <th className="p-3 text-center border-b">{t.stock}</th>
              <th className="p-3 text-center border-b">{t.unit}</th>
              <th className="p-3 text-center border-b">{t.costPrice}</th>
              <th className="p-3 text-center border-b">{t.sellingPrice}</th>
              {Array.from({ length: maxMaterials }).map((_, i) => (
                <th key={i} className="p-3 text-center border-b">{`${t.material} ${i + 1}`}</th>
              ))}
              <th className="p-3 text-center border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className={`transition duration-200 ${darkmode ? "hover:bg-blue-900/20 border-gray-700" : "hover:bg-blue-50 border-gray-200"}`}>
                <td className="p-2 text-center border-b">{item.id}</td>
                <td className="p-2 font-medium text-center border-b">{item.name}</td>
                <td className="p-2 text-center border-b">{item.group}</td>
                <td className="p-2 text-center border-b">{item.stock}</td>
                <td className="p-2 text-center border-b">{item.unit}</td>
                <td className="p-2 text-center border-b">{item.costPrice}</td>
                <td className="p-2 text-center border-b">{item.sellingPrice}</td>
                {Array.from({ length: maxMaterials }).map((_, i) => (
                  <td key={i} className="p-2 text-center border-b">
                    {item[`material${i + 1}`] ? `${item[`material${i + 1}`]} (${item[`material${i + 1}Qty`]})` : "-"}
                  </td>
                ))}
                <td className="p-2 text-center border-b">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => handleEdit(item)} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all shadow-sm ${darkmode ? "bg-blue-800 hover:bg-blue-700 text-blue-100" : "bg-blue-100 hover:bg-blue-200 text-blue-700"}`}>
                      <Pencil size={14}/> {t.edit}
                    </button>
                    <button onClick={() => handleDelete(item.id)} className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all shadow-sm ${darkmode ? "bg-red-800 hover:bg-red-700 text-red-100" : "bg-red-100 hover:bg-red-200 text-red-700"}`}>
                      <Trash2 size={14}/> {t.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block gap-2 mt-6 space-y-6 md:hidden">
        {products.map((item) => (
          <div key={item.id} className={`rounded-xl border p-4 shadow-sm transition-all ${darkmode ? "bg-gray-900 border-gray-700" : "bg-blue-50 border-blue-200"}`}>
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="font-semibold text-blue-500 dark:text-blue-300">{item.name}</h3>
              <span className="text-xs opacity-70">#{item.id} - {item.group}</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p><strong>{t.stock}:</strong> {item.stock} {item.unit}</p>
              <p><strong>{t.costPrice}:</strong> {item.costPrice}</p>
              <p><strong>{t.sellingPrice}:</strong> {item.sellingPrice}</p>
              {Array.from({ length: maxMaterials }).map((_, i) =>
                item[`material${i + 1}`] ? (
                  <p key={i}><strong>{`${t.material} ${i + 1}:`}</strong> {item[`material${i + 1}`]} ({item[`material${i + 1}Qty`]})</p>
                ) : null
              )}
            </div>
            <div className="flex flex-wrap gap-3 py-3 mt-3">
              <button onClick={() => handleEdit(item)} className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${darkmode ? "bg-blue-800 hover:bg-blue-700 text-blue-100" : "bg-blue-100 hover:bg-blue-200 text-blue-700"}`}>
                <Pencil size={14}/> {t.edit}
              </button>
              <button onClick={() => handleDelete(item.id)} className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${darkmode ? "bg-red-800 hover:bg-red-700 text-red-100" : "bg-red-100 hover:bg-red-200 text-red-700"}`}>
                <Trash2 size={14}/> {t.delete}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popups */}
      {editingProduct && (
        <EditInitialProduct product={editingProduct} onClose={() => setEditingProduct(null)} onSave={handleSave} />
      )}
      {addingProduct && (
        <AddNewProduct onClose={() => setAddingProduct(false)} onSave={handleAddNew} />
      )}
    </div>
  );
}
