import React, { useState } from "react";
import { useLanguage } from "../../Provider/LanguageContext";
import { Pencil, Trash2 } from "lucide-react";

export default function InitialProduct() {
  const { lang, darkmode, dir } = useLanguage();

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
      material3: "Cap",
      material3Qty: "120pcs",
      material4: "Label",
      material4Qty: "120pcs",
      material5: "Box",
      material5Qty: "10pcs",
      material6: "Sticker",
      material6Qty: "120pcs",
      material7: "Tag",
      material7Qty: "120pcs",
      material8: "Seal",
      material8Qty: "120pcs",
    },
  ]);

  const handleEdit = (id) => alert(`Edit product with ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm(lang === "fa" ? "حذف شود؟" : "Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const maxMaterials = Math.max(
    ...products.map((p) =>
      Object.keys(p).filter((k) => k.startsWith("material")).length / 2
    )
  );

  return (
    <div
      className={`rounded-2xl shadow-lg p-5 border ${
        darkmode
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      } ${dir} transition-all duration-500`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          darkmode ? "text-blue-300" : "text-blue-700"
        }`}
      >
        {lang === "fa" ? "جدول محصولات اولیه" : "Initial Product Table"}
      </h2>

      {/* ===== دسکتاپ و تبلت ===== */}
      <div className="hidden overflow-x-auto shadow-inner md:block rounded-xl">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr
              className={`${
                darkmode
                  ? "bg-blue-900/40 text-blue-100"
                  : "bg-blue-100 text-blue-900"
              }`}
            >
              <th className="p-3 text-center border-b">ID</th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "نام محصول" : "Product Name"}
              </th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "گروپ" : "Group"}
              </th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "تعداد در گدام" : "Stock"}
              </th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "واحد" : "Unit"}
              </th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "قیمت تمام شده" : "Cost Price"}
              </th>
              <th className="p-3 text-center border-b">
                {lang === "fa" ? "قیمت فروش" : "Selling Price"}
              </th>

              {Array.from({ length: maxMaterials }).map((_, i) => (
                <th key={i} className="p-3 text-center border-b">
                  {lang === "fa" ? `مواد اولیه ${i + 1}` : `Material ${i + 1}`}
                </th>
              ))}

              <th className="p-3 text-center border-b">
                {lang === "fa" ? "عملیات" : "Actions"}
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className={`transition duration-200 ${
                  darkmode
                    ? "hover:bg-blue-900/20 border-gray-700"
                    : "hover:bg-blue-50 border-gray-200"
                }`}
              >
                <td className="p-2 text-center border-b">{item.id}</td>
                <td className="p-2 font-medium text-center border-b">{item.name}</td>
                <td className="p-2 text-center border-b">{item.group}</td>
                <td className="p-2 text-center border-b">{item.stock}</td>
                <td className="p-2 text-center border-b">{item.unit}</td>
                <td className="p-2 text-center border-b">{item.costPrice}</td>
                <td className="p-2 text-center border-b">{item.sellingPrice}</td>

                {Array.from({ length: maxMaterials }).map((_, i) => (
                  <td key={i} className="p-2 text-center border-b">
                    {item[`material${i + 1}`]
                      ? `${item[`material${i + 1}`]} (${item[`material${i + 1}Qty`]})`
                      : "-"}
                  </td>
                ))}

                <td className="p-2 text-center border-b">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all shadow-sm ${
                        darkmode
                          ? "bg-blue-800 hover:bg-blue-700 text-blue-100"
                          : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                      }`}
                    >
                      <Pencil size={14} /> {lang === "fa" ? "ویرایش" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all shadow-sm ${
                        darkmode
                          ? "bg-red-800 hover:bg-red-700 text-red-100"
                          : "bg-red-100 hover:bg-red-200 text-red-700"
                      }`}
                    >
                      <Trash2 size={14} /> {lang === "fa" ? "حذف" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== موبایل ===== */}
      <div className="block gap-2 mt-6 space-y-6 md:hidden">
        {products.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-4 shadow-sm transition-all ${
              darkmode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-200"
            }`}
          >
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="font-semibold text-blue-500 dark:text-blue-300">{item.name}</h3>
              <span className="text-xs opacity-70">#{item.id} - {item.group}</span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <p><strong>{lang === "fa" ? "تعداد:" : "Stock:"}</strong> {item.stock} {item.unit}</p>
              <p><strong>{lang === "fa" ? "قیمت تمام شده:" : "Cost Price:"}</strong> {item.costPrice}</p>
              <p><strong>{lang === "fa" ? "قیمت فروش:" : "Selling Price:"}</strong> {item.sellingPrice}</p>
              {Array.from({ length: maxMaterials }).map((_, i) =>
                item[`material${i + 1}`] ? (
                  <p key={i}>
                    <strong>{lang === "fa" ? `مواد ${i + 1}:` : `Mat. ${i + 1}:`}</strong> {item[`material${i + 1}`]} ({item[`material${i + 1}Qty`]})
                  </p>
                ) : null
              )}
            </div>

            <div className="flex flex-wrap gap-3 py-3 mt-3">
              <button
                onClick={() => handleEdit(item.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  darkmode ? "bg-blue-800 hover:bg-blue-700 text-blue-100" : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                }`}
              >
                <Pencil size={14} /> {lang === "fa" ? "ویرایش" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  darkmode ? "bg-red-800 hover:bg-red-700 text-red-100" : "bg-red-100 hover:bg-red-200 text-red-700"
                }`}
              >
                <Trash2 size={14} /> {lang === "fa" ? "حذف" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
