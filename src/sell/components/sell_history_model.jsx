/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import "./saleHistoryPrinter.css";
import {
  Table,
  Button,
  DatePicker,
  Pagination,
  Card,
  ConfigProvider,
  theme,
  Skeleton,
  Typography
} from "antd";
import {
  PrinterOutlined,
  UploadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../Provider/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceModal from "./InvoiceModal";
import { generatePDF } from "../../components/PDFmaker";
import useSellPageService from "../service/SellHistoryPageServices";



const { RangePicker } = DatePicker;

export default function SalesHistoryFull({ onClose, salesData }) {
  const {Title}=Typography
  const fileInputRef = useRef(null);
  const { darkmode ,SellPageHistory} = useLanguage();
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  /* ============== SIMULATE LOAD ============== */
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [salesData, dateRange, currentPage, pageSize]);

  /* ============== SERVICE ============== */
  const {
    columns,
    handleColumnFilter,
    summary,
    handleBackup,
    handleImportBackup,
    currentData,
    filteredSales,
  } = useSellPageService({
    currentPage,
    salesData,
    dateRange,
    pageSize,
    setCurrentPage,
    setSelectedInvoice,
  });

  return (
    <ConfigProvider theme={darkmode ? { algorithm: theme.darkAlgorithm } : {}}>
      <AnimatePresence>
        <motion.div
          className={`fixed inset-0 z-50 overflow-y-auto px-3 py-4
          ${darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
        >
          {/* ================= HEADER ================= */}
       <div className="flex flex-col items-center gap-3 mb-4 lg:flex-row lg:justify-between">
  {/* Left: Close button and Title */}
  <div className="flex flex-col-reverse items-center w-full gap-5 lg:flex-row">
    <Button className="w-full lg:w-20" danger onClick={onClose}>
      {SellPageHistory.close}
    </Button>
    <Title level={4} className="font-bold text-gray-800 text-md">
      {SellPageHistory.SellPageHistoryTitle}
    </Title>
  </div>

  {/* Right: Actions */}
  <div className="flex flex-col items-center w-full gap-2 lg:flex-row">
    {/* Hidden File Input */}
    <input
      ref={fileInputRef}
      type="file"
      accept=".xlsx,.xls"
      onChange={handleImportBackup}
      className="hidden "
    />

    {/* Backup Button */}
    <Button className="w-full" icon={<DatabaseOutlined />} onClick={handleBackup}>
      {SellPageHistory.backup}
    </Button>

    {/* Print PDF Button */}
    <Button
      icon={<PrinterOutlined />}
      className="w-full"
      onClick={() =>
        generatePDF({
          title: "Sales Report",
          data: filteredSales,
          columns: [
            { key: "invoice", label: "Invoice" },
            { key: "customer", label: "Customer" },
            { key: "date", label: "Date" },
            { key: "total", label: "Total" },
            { key: "isReturn", label: "Status" },
          ],
          totalColumn: "total",
          showTotal: true,
        })
      }
    >
      {SellPageHistory.printPdf}
    </Button>

    {/* Date Range Picker */}
    <RangePicker
    className="w-full"
      value={dateRange.length ? dateRange : undefined}
      onChange={(dates) => setDateRange(dates || [])}
    />

    {/* Custom Upload Button */}
    <button
      className="flex items-center w-full gap-1 px-3 py-2 text-sm text-white transition bg-blue-600 rounded cursor-pointer container-btn-file hover:bg-blue-700"
      onClick={() => fileInputRef.current.click()}
      title={SellPageHistory.uploadBackup}
    >
      <svg
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 50 50"
      >
        <path d="M28.8125 .03125L.8125 5.34375C.339844 5.433594 0 5.863281 0 6.34375L0 43.65625C0 44.136719 .339844 44.566406 .8125 44.65625L28.8125 49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"></path>
      </svg>
      {SellPageHistory.uploadBackup}
    </button>
  </div>
</div>


          {/* ================= SUMMARY ================= */}
          <div className="grid grid-cols-1 gap-3 py-4 md:grid-cols-3 lg:grid-cols-5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i}>
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </Card>
                ))
              : [
                  [SellPageHistory.totalInvoices, summary.totalInvoices],
                  [SellPageHistory.returned, summary.returnedCount],
                  [SellPageHistory.totalAmount, summary.totalAmount],
                  [SellPageHistory.completedAmount, summary.completedAmount],
                  [SellPageHistory.returnedAmount, summary.returnedAmount],
                ].map(([title, value], i) => (
                  <Card key={i}  className="text-center">
                    <div className="text-sm">{title}</div>
                    <div className="text-lg font-semibold">{value}</div>
                  </Card>
                ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block">
            <Table
            bordered
              size="small"
              columns={columns}
              dataSource={currentData}
              rowKey="invoice"
              pagination={false}
              loading={loading}
              onChange={(pagination, filters) => {
                Object.entries(filters).forEach(([key, value]) =>
                  handleColumnFilter(key, value)
                );
              }}
            />
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="flex flex-col gap-4 space-y-3 md:hidden">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i}>
                    <Skeleton active paragraph={{ rows: 4 }} />
                  </Card>
                ))
              : currentData.map((item) => (
                  <div
                    key={item.invoice}
                    className={`rounded-lg border p-3 shadow-sm
            ${
              darkmode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500"> {SellPageHistory.invoice}</span>
                      <span className="font-semibold">{item.invoice}</span>
                    </div>

                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-gray-500">{SellPageHistory.customer}</span>
                      <span className="text-right">{item.customer}</span>
                    </div>

                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-gray-500">{SellPageHistory.date}</span>
                      <span>{item.date}</span>
                    </div>

                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-gray-500">{SellPageHistory.total}</span>
                      <span className="font-semibold">
                        {item.total}
                      </span>
                    </div>

                    <div className="flex justify-between mt-1 text-sm">
                      <span className="text-gray-500">{SellPageHistory.status}</span>
                      <span
                        className={`font-semibold ${
                          item.isReturn ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {item.isReturn ? "Returned" : "Completed"}
                      </span>
                    </div>
                    <div className="py-4">
                      <button
                        className="flex justify-center w-full .my_button"
                        onClick={() => setSelectedInvoice(item)}
                      >
                        <span className="w-full px-3 py-2 box ">{SellPageHistory.details}</span>
                      </button>
                    </div>
                  </div>
                ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {!loading && (
            <div className="flex justify-center py-6">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredSales.length}
                showSizeChanger
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
              />
            </div>
          )}

          {/* ================= INVOICE MODAL ================= */}
          {selectedInvoice && (
            <InvoiceModal
              visible={!!selectedInvoice}
              invoice={selectedInvoice}
              onClose={() => setSelectedInvoice(null)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </ConfigProvider>
  );
}
