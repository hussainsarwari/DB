import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Pagination,
  message,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  PrinterOutlined,
  UploadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../Provider/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { Card, Col, Row } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function SalesHistoryFull({ salesData = null, onClose }) {
  const fileInputRef = useRef(null);
  const [importedSales, setImportedSales] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { darkmode } = useLanguage();

  const staticSales = Array.from({ length: 90 }, (_, i) => ({
    invoice: `INV-${1000 + i}`,
    customer: `Customer ${i + 1}`,
    date: `2036-01-${String((i % 30) + 1).padStart(2, "0")}`,
    total: `$${(100 + i * 10).toFixed(2)}`,
    isReturn: i % 8 === 0,
  }));

  const finalSales = importedSales || salesData || staticSales;

  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateRange, setDateRange] = useState([]);
  const [filteredSales, setFilteredSales] = useState(finalSales);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Filter logic
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
    if (filterStatus === "Completed") data = data.filter((s) => !s.isReturn);
    else if (filterStatus === "Returned") data = data.filter((s) => s.isReturn);

    if (dateRange.length === 2) {
      data = data.filter(
        (s) =>
          moment(s.date).isSameOrAfter(dateRange[0], "day") &&
          moment(s.date).isSameOrBefore(dateRange[1], "day")
      );
    }

    setFilteredSales(data);
    setCurrentPage(1);
  }, [query, filterStatus, dateRange, finalSales]);

  // Import backup
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

        if (!mapped.length) {
          message.error("The selected file does not contain valid data");
          return;
        }

        setImportedSales(mapped);
        message.success(`Backup imported successfully (${mapped.length} invoices)`);
        e.target.value = "";
      } catch (err) {
        message.error("Failed to import backup file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Backup
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

    const fileName = `sales-backup-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:T]/g, "-")}.xlsx`;

    XLSX.writeFile(workbook, fileName);
    message.success("Backup created successfully");
  };

  const columns = [
    { title: "Invoice", dataIndex: "invoice", key: "invoice" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "isReturn",
      key: "status",
      render: (isReturn) => (
        <span style={{ color: isReturn ? "red" : "green" }}>
          {isReturn ? "Returned" : "Completed"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() => setSelectedInvoice(record)}
          />
          <Button icon={<PrinterOutlined />} onClick={() => window.print()} />
        </Space>
      ),
    },
  ];

  const currentData = filteredSales.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const summary = {
    totalInvoices: filteredSales.length,
    returnedCount: filteredSales.filter((s) => s.isReturn).length,
    totalAmount: filteredSales.reduce(
      (sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")),
      0
    ),
    completedAmount: filteredSales
      .filter((s) => !s.isReturn)
      .reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")), 0),
    returnedAmount: filteredSales
      .filter((s) => s.isReturn)
      .reduce((sum, s) => sum + parseFloat(s.total.replace(/[^0-9.-]+/g, "")), 0),
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-auto"
        style={{ background: darkmode ? "#111" : "#fff", padding: 20 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
        {/* Close button */}
        <div style={{ textAlign: "right", marginBottom: 10 }}>
          <Button onClick={onClose} type="primary">
            Close
          </Button>
        </div>

        {/* Summary */}
        <div  className="flex gap-4 m-2">
          {[
            ["Total Invoices", summary.totalInvoices],
            ["Returned", summary.returnedCount],
            ["Total Amount", formatCurrency(summary.totalAmount)],
            ["Completed Amount", formatCurrency(summary.completedAmount)],
            ["Returned Amount", formatCurrency(summary.returnedAmount)],
            ["Total Profit", `$${summary.totalProfit}`],
          ].map(([title, value], i) => (
            <div className="w-70" key={i}>
              <Card
                hoverable
                className={`p-1 text-center ${
                  darkmode ? "bg-slate-800 text-gray-200" : "bg-white text-gray-800"
                }`}
              >
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xl font-semibold">{value}</div>
              </Card>
            </div>
          ))}
        </div>

<div className="flex flex-row-reverse justify-between p-5">
        {/* Actions */}
        <Space style={{}}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImportBackup}
            style={{ display: "none" }}
          />
          <Button icon={<UploadOutlined />} type="primary" onClick={() => fileInputRef.current.click()}>
            Import Backup
          </Button>
          <Button icon={<DatabaseOutlined />} onClick={handleBackup}>
            Backup
          </Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
            Print
          </Button>
        </Space>

        {/* Filters */}
        <Space  >
          <Input
            placeholder="Search Invoice / Customer"
            prefix={<SearchOutlined />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 150 }}>
            <Option value="All">All</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Returned">Returned</Option>
          </Select>
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
          />
        </Space>
</div>
        {/* Table */}
        <Table
          columns={columns}
          dataSource={currentData}
          pagination={false}
          rowKey="invoice"
          bordered
          style={{ background: darkmode ? "#222" : "#fff" }}
        />

        {/* Pagination */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredSales.length}
          onChange={setCurrentPage}
          style={{ marginTop: 20, textAlign: "right" }}
        />

        {/* Invoice Modal */}
        <AnimatePresence>
          {selectedInvoice && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-11/12 max-w-lg p-6 bg-white shadow-lg rounded-xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-2 text-lg font-semibold">
                  Invoice: {selectedInvoice.invoice}
                </h3>
                <p>Customer: {selectedInvoice.customer}</p>
                <p>Date: {selectedInvoice.date}</p>
                <p>Total: {selectedInvoice.total}</p>
                <p>Status: {selectedInvoice.isReturn ? "Returned" : "Completed"}</p>
                <div style={{ textAlign: "right", marginTop: 20 }}>
                  <Button type="primary" onClick={() => setSelectedInvoice(null)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
