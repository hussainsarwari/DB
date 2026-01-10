import { useState, useRef, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  Button,
  Select,
  DatePicker,
  Space,
  Pagination,
  message,
  Card,
  ConfigProvider,
  theme,
} from "antd";
import {
  EyeOutlined,
  PrinterOutlined,
  UploadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../Provider/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import InvoiceModal from "./InvoiceModal";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function SalesHistoryFull({ salesData = null, onClose }) {
  const fileInputRef = useRef(null);
  const { darkmode } = useLanguage();

  const [finalSales, setFinalSales] = useState([]);
  const [importedSales, setImportedSales] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [tableFilters, setTableFilters] = useState({});


  const staticSales = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        invoice: `INV-${1000 + i}`,
        customer: `Customer ${i + 1}`,
        date: `2036-01-${String((i % 30) + 1).padStart(2, "0")}`,
        total: `$${(100 + i * 10).toFixed(2)}`,
        isReturn: i % 8 === 0,
      })),
    []
  );

  useEffect(() => {
    setFinalSales(importedSales || salesData || staticSales);
  }, [importedSales, salesData, staticSales]);

const filteredSales = useMemo(() => {
  let data = [...finalSales];

  // فیلتر تاریخ
  if (dateRange.length === 2) {
    const [start, end] = dateRange;
    data = data.filter(s =>
      s.date &&
      moment(s.date).isBetween(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
        "day",
        "[]"
      )
    );
  }

  // فیلتر ستون‌ها بر اساس tableFilters
  Object.entries(tableFilters).forEach(([key, value]) => {
    if (value) data = data.filter(item => item[key] === value);
  });

  // مرتب‌سازی بر اساس تاریخ
  data.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

  return data;
}, [finalSales, dateRange, tableFilters]);

const currentData = useMemo(
  () => filteredSales.slice((currentPage - 1) ),
  [filteredSales, currentPage]
);

  // import back up
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        const mapped = json.map((row, i) => ({
          invoice: row.Invoice || `IMPORTED-${i + 1}`,
          customer: row.Customer || "Unknown",
          date: row.Date,
          total: `$${Number(row.Total).toFixed(2)}`,
          isReturn: row.Status === "Returned",
        }));
        if (!mapped.length) return message.error("Invalid file");
        setImportedSales(mapped);
        message.success(`Backup imported (${mapped.length} invoices)`);
        e.target.value = "";
      } catch {
        message.error("Failed to import backup file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBackup = () => {
    const data = filteredSales.map((s) => ({
      Invoice: s.invoice,
      Customer: s.customer,
      Date: s.date,
      Total: parseFloat(s.total.replace(/[^0-9.-]+/g, "")),
      Status: s.isReturn ? "Returned" : "Completed",
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales History");
    XLSX.writeFile(
      workbook,
      `sales-backup-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.xlsx`
    );
    message.success("Backup created successfully");
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const summary = useMemo(() => ({
  totalInvoices: filteredSales.length,
  returnedCount: filteredSales.filter(s => s.isReturn).length,
  totalAmount: filteredSales.reduce(
    (sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")),
    0
  ),
  completedAmount: filteredSales
    .filter(s => !s.isReturn)
    .reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")), 0),
  returnedAmount: filteredSales
    .filter(s => s.isReturn)
    .reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")), 0),
}), [filteredSales]);


const handleColumnFilter = (key, value) => {
  setTableFilters(prev => ({ ...prev, [key]: value }));
};
  
  // تابع برای گرفتن مقادیر داینامیک ستون‌ها
const buildFilters = (data, key) => {
  return [...new Set(data.map(item => item[key]).filter(Boolean))].map(v => ({
    text: v,
    value: v,
  }));
};

const columns = [
  {
    title: "Invoice",
    dataIndex: "invoice",
    key: "invoice",
    align: "center",          // مرکز چین شدن
    width: 120,               // اختیاری: کم کردن عرض
    filters: buildFilters(filteredSales, "invoice"),
    filterMode: "tree",
    filterSearch: true,
    sorter: (a, b) => a.invoice.localeCompare(b.invoice),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    align: "center",
    width: 150,
    filters: buildFilters(filteredSales, "customer"),
    filterMode: "tree",
    filterSearch: true,
    sorter: (a, b) => a.customer.localeCompare(b.customer),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
    width: 120,
    filters: buildFilters(filteredSales, "date"),
    filterSearch: true,
    sorter: (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(),
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center",
    width: 120,
    filters: buildFilters(filteredSales, "total"),
    filterSearch: true,
    sorter: (a, b) => Number(a.total) - Number(b.total),
  },
  {
    title: "Status",
    dataIndex: "isReturn",
    key: "status",
    align: "center",
    width: 100,
    filters: [
      { text: "Completed", value: false },
      { text: "Returned", value: true },
    ],
    render: isReturn => (
      <span style={{ color: isReturn ? "red" : "green" }}>
        {isReturn ? "Returned" : "Completed"}
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    width: 60,               // کاهش عرض Action
    render: (_, record) => (
      <Button
        icon={<EyeOutlined />}
        size="small"
        type="primary"
        onClick={() => setSelectedInvoice(record)}
      />
    ),
  },
];



  return (
<ConfigProvider theme={darkmode ? { algorithm: theme.darkAlgorithm } : {}}>
  <AnimatePresence>
    <motion.div
      className={`fixed inset-0 z-50 overflow-auto p-4 ${darkmode ? "bg-gray-900" : "bg-white"}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row md:items-center">
        <Space wrap>
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleImportBackup} style={{ display: "none" }} />
          <Button icon={<UploadOutlined />} type="primary" onClick={() => fileInputRef.current.click()}>Import Backup</Button>
          <Button icon={<DatabaseOutlined />} onClick={handleBackup}>Backup</Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
          <RangePicker value={dateRange.length ? dateRange : undefined} onChange={(dates) => setDateRange(dates || [])} />
        </Space>
        <Button onClick={onClose} type="primary">Close</Button>
      </div>

      {/* Summary با انیمیشن */}
   <motion.div
  className="flex gap-2 py-3"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // کارت‌ها یکی‌یکی ظاهر شوند
      },
    },
  }}
>
  {[
    ["Total Invoices", summary.totalInvoices],
    ["Returned", summary.returnedCount],
    ["Total Amount", formatCurrency(summary.totalAmount)],
    ["Completed Amount", formatCurrency(summary.completedAmount)],
    ["Returned Amount", formatCurrency(summary.returnedAmount)],
  ].map(([title, value], i) => (
    <motion.div
      key={i}
      className="sm:w-1/5"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{
        type: "spring",   // حرکت نرم‌تر با spring
        stiffness: 150,   // سختی حرکت spring
        damping: 20,      // مهار لرزش
      }}
    >
      <Card hoverable className="text-center shadow-md">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </Card>
    </motion.div>
  ))}
</motion.div>


    {/* جدول با انیمیشن حرفه‌ای */}
<motion.div
  initial="hidden"
  animate="visible"
  
  variants={{
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",      // حرکت نرم و طبیعی
        stiffness: 120,      // سختی حرکت spring
        damping: 20,         // مهار لرزش
        duration: 0.6,   
        delay:0.5    // مدت زمان کلی
      },
    },
  }}
>
  <Table
    columns={columns}
    dataSource={currentData}
    rowKey="invoice"
    pagination={{ pageSize: 10, current: currentPage }}
    scroll={{ x: "max-content" }}
    onChange={(pagination, filters, sorter) => {
      Object.entries(filters).forEach(([key, value]) => {
        handleColumnFilter(key, value?.[0] || null);
      });
      setCurrentPage(pagination.current);
    }}
  />
</motion.div>


  
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
