import React from "react";

function ProductTable({ products, onEdit, onDelete, darkmode, t, lang }) {
  const isRTL = lang === "fa" || lang === "ar" || lang === "ps";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`overflow-x-auto rounded-xl shadow-md ${
        darkmode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <table className="w-full min-w-[800px] text-sm border-collapse">
        <thead
          className={`${
            darkmode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
          }`}
        >
          <tr>
            <th className="p-3 text-left">{t.id}</th>
            <th className="p-3 text-left">{t.name}</th>
            <th className="p-3 text-left">{t.category}</th>
            <th className="p-3 text-left">{t.inventory}</th>
            <th className="p-3 text-left">{t.material1}</th>
            <th className="p-3 text-left">{t.material1Amount}</th>
            <th className="p-3 text-left">{t.material2}</th>
            <th className="p-3 text-left">{t.material2Amount}</th>
            <th className="p-3 text-center">{t.actions}</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.id || i}
              className={`border-t ${
                darkmode ? "border-gray-700 hover:bg-gray-700/60" : "hover:bg-gray-50"
              }`}
            >
              <td className="p-3">{p.id}</td>
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.inventory}</td>

              {/* مواد اولیه */}
              <td className="p-3">
                {Object.keys(p.materials || {})[0] || "-"}
              </td>
              <td className="p-3">
                {Object.values(p.materials || {})[0]?.amount || "-"}
              </td>
              <td className="p-3">
                {Object.keys(p.materials || {})[1] || "-"}
              </td>
              <td className="p-3">
                {Object.values(p.materials || {})[1]?.amount || "-"}
              </td>

              {/* دکمه‌های عملیات */}
              <td className="p-3 space-x-2 space-x-reverse text-center">
                <button
                  onClick={() => onEdit(p)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    darkmode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  }`}
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    darkmode
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                  }`}
                >
                  {t.delete}
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="9" className="p-4 text-center opacity-70">
                {t.noData}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
