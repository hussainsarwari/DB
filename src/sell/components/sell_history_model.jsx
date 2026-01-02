import { useState, useEffect, useRef } from "react";
import { Search, Eye, Printer, FileText, X } from "lucide-react";
import { useLanguage } from "../../Provider/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Chart from "react-apexcharts";

export default function SalesHistoryFull({ salesData = null, onClose }) {
  const { darkmode } = useLanguage();
  const tableRef = useRef();

  const staticSales = Array.from({ length: 30 }, (_, i) => ({
    invoice: `INV-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    date: `2026-01-${String((i % 30) + 1).padStart(2, "0")}`,
    total: `$${(100 + i * 10).toFixed(2)}`,
    isReturn: i % 8 === 0
  }));

  const finalSales = salesData || staticSales;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredSales, setFilteredSales] = useState(finalSales);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    let data = finalSales;
    if (query) {
      const lower = query.toLowerCase();
      data = data.filter(
        (s) =>
          s.invoice.toLowerCase().includes(lower) ||
          s.customer.toLowerCase().includes(lower)
      );
    }
    if (filterStatus === "Completed") data = data.filter(s => !s.isReturn);
    else if (filterStatus === "Returned") data = data.filter(s => s.isReturn);
    if (fromDate) data = data.filter(s => new Date(s.date) >= new Date(fromDate));
    if (toDate) data = data.filter(s => new Date(s.date) <= new Date(toDate));
    setFilteredSales(data);
    setCurrentPage(1);
  }, [query, filterStatus, fromDate, toDate, finalSales]);

  const totalAmount = filteredSales.reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g,"")), 0);
  const totalInvoices = filteredSales.length;
  const returnedCount = filteredSales.filter(s => s.isReturn).length;
  const completedAmount = filteredSales.filter(s => !s.isReturn).reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g,"")), 0);
  const returnedAmount = filteredSales.filter(s => s.isReturn).reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g,"")), 0);

  const totalPages = Math.ceil(filteredSales.length / pageSize);
  const currentData = filteredSales.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && currentPage < totalPages) setCurrentPage(p => p + 1);
      else if (e.key === "ArrowLeft" && currentPage > 1) setCurrentPage(p => p - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  const handlePrint = () => {
    if (!tableRef.current) return;
    const printContent = tableRef.current.innerHTML;
    const myWindow = window.open('', '', 'width=900,height=700');
    myWindow.document.write('<html><head><title>Sales History</title></head><body>');
    myWindow.document.write(`<h3>Sales Summary</h3>
      <p>Total Invoices: ${totalInvoices}</p>
      <p>Completed Amount: ${formatCurrency(completedAmount)}</p>
      <p>Returned Amount: ${formatCurrency(returnedAmount)}</p>
      <p>Total Amount: ${formatCurrency(totalAmount)}</p>
    `);
    myWindow.document.write(printContent);
    myWindow.document.write('</body></html>');
    myWindow.document.close();
    myWindow.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex flex-col p-6 gap-3 min-h-screen overflow-y-scroll ${darkmode ? "bg-slate-900" : "bg-white"}`}
  initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
      
             {/* Summary + Line Chart */}
        <div className={`p-6  ${darkmode ? "bg-slate-800 text-gray-200" : "bg-white text-gray-800"}`}>
          {/* Text summary */}
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-6">
            {[["Total Invoices", totalInvoices], ["Returned", returnedCount], ["Total Amount", formatCurrency(totalAmount)], ["Completed Amount", formatCurrency(completedAmount)], ["Returned Amount", formatCurrency(returnedAmount)], ["Total Profit", "$768"]].map(([title, value], i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-lg shadow-sm bg-white/90">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xl font-semibold">{value}</span>
              </div>
            ))}
          </div>

       
        </div>

        {/* Header */}
        <div className="flex flex-col items-start gap-3 mb-4 md:flex-row-reverse md:justify-between md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${darkmode ? "bg-slate-800 text-blue-300 hover:bg-slate-700" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>
              <FileText size={16} /> Export PDF
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${darkmode ? "bg-slate-800 text-blue-300 hover:bg-slate-700" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>
              <Printer size={16} /> Export Excel
            </button>
            <button onClick={handlePrint} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${darkmode ? "bg-slate-800 text-green-300 hover:bg-slate-700" : "bg-green-50 text-green-600 hover:bg-green-100"}`}>
              <Printer size={16} /> Print
            </button>
          </div>
      

        {/* Filters */}
        <div className="flex gap-3 ">
          <div className={`flex items-center gap-2 p-2 rounded-xl border ${darkmode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search Invoice / Customer"
              className={`w-full bg-transparent outline-none text-sm ${darkmode ? "text-gray-200" : "text-gray-800"}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${darkmode ? "bg-slate-800 border-slate-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
            >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Returned">Returned</option>
          </select>

          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${darkmode ? "bg-slate-800 border-slate-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`} />
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${darkmode ? "bg-slate-800 border-slate-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`} />
            </div>
        </div>

     

        {/* Table remains unchanged */}
        <div ref={tableRef} className={`overflow-y-auto max-h-[600px] rounded-xl border mb-4 shadow-sm ${darkmode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"}`}>
          <table className="w-full text-sm">
            <thead className={`text-left ${darkmode ? "bg-slate-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className={`text-center py-6 ${darkmode ? "text-gray-400" : "text-gray-500"}`}>No sales found</td>
                </tr>
              ) : (
                currentData.map((s, i) => (
                  <tr key={i} className={`border-t hover:bg-gray-100 ${darkmode ? "border-slate-700" : "border-gray-200"} ${s.isReturn ? (darkmode ? "bg-red-900/30" : "bg-red-50") : ""}`}>
                    <td className="px-4 py-3 font-medium">{s.invoice}</td>
                    <td className="px-4 py-3">{s.customer}</td>
                    <td className="px-4 py-3">{s.date}</td>
                    <td className="px-4 py-3">{s.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${s.isReturn ? (darkmode ? "bg-red-900/70 text-red-300" : "bg-red-100 text-red-700") : (darkmode ? "bg-green-900/70 text-green-300" : "bg-green-100 text-green-700")}`}>
                        {s.isReturn ? "Returned" : "Completed"}
                      </span>
                    </td>
                    <td className="flex justify-end gap-2 px-4 py-3 text-right">
                      <button className={`p-2 rounded-lg transition ${darkmode ? "hover:bg-slate-800 text-blue-400" : "hover:bg-gray-100 text-blue-600"}`} onClick={() => setSelectedInvoice(s)}>
                        <Eye size={16} />
                      </button>
                      <button className={`p-2 rounded-lg transition ${darkmode ? "hover:bg-slate-800 text-blue-400" : "hover:bg-gray-100 text-blue-600"}`}>
                        <Printer size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        



<div className="flex flex-row-reverse justify-between">
    

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-end gap-2 mt-2 text-sm">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">First</button>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
          {[...Array(totalPages)].map((_, idx) => (
            <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`px-3 py-1 border rounded hover:bg-gray-100 ${currentPage === idx + 1 ? "bg-blue-500 text-white" : ""}`}>{idx + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Last</button>
        </div>


         <button onClick={onClose} className="px-8 py-2 text-blue-600 transition border border-blue-500 cursor-pointer rounded-xl">
            back
          </button>
</div>

        {/* Invoice Modal */}
        <AnimatePresence>
          {selectedInvoice && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className={`bg-white rounded-xl p-6 w-11/12 max-w-lg shadow-lg`} initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                <h3 className={`text-lg font-semibold mb-2 ${darkmode ? "text-gray-100" : "text-gray-800"}`}>Invoice: {selectedInvoice.invoice}</h3>
                <p className="mb-1">Customer: {selectedInvoice.customer}</p>
                <p className="mb-1">Date: {selectedInvoice.date}</p>
                <p className="mb-1">Total: {selectedInvoice.total}</p>
                <p>Status: {selectedInvoice.isReturn ? "Returned" : "Completed"}</p>
                <div className="flex justify-end mt-4">
                  <button className="px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600" onClick={() => setSelectedInvoice(null)}>Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}














