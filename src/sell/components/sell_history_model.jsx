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
  const pageSize = 20;

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

    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      data = data.filter((s) => s.date && moment(s.date).isBetween(start, end, "day", "[]"));
    }

    data.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

    return data;
  }, [finalSales, dateRange]);

  const currentData = useMemo(
    () => filteredSales.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredSales, currentPage]
  );

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
  }), [filteredSales]);

  // تابع برای گرفتن مقادیر داینامیک ستون‌ها
  const getUniqueValues = (data, key) => [...new Set(data.map((item) => item[key]))];

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      align: "center",
      sorter: (a, b) => a.invoice.localeCompare(b.invoice),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select Invoice"
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
            style={{ width: 200, marginBottom: 8 }}
            allowClear
          >
            {getUniqueValues(finalSales, "invoice").map((inv) => (
              <Option key={inv} value={inv}>{inv}</Option>
            ))}
          </Select>
          <Space>
            <Button onClick={confirm} type="primary" size="small">Filter</Button>
            <Button onClick={clearFilters} size="small">Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (values, record) => values.includes(record.invoice),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      align: "center",
      sorter: (a, b) => a.customer.localeCompare(b.customer),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select Customer"
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
            style={{ width: 200, marginBottom: 8 }}
            allowClear
          >
            {getUniqueValues(finalSales, "customer").map((c) => (
              <Option key={c} value={c}>{c}</Option>
            ))}
          </Select>
          <Space>
            <Button onClick={confirm} type="primary" size="small">Filter</Button>
            <Button onClick={clearFilters} size="small">Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (values, record) => values.includes(record.customer),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      sorter: (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={selectedKeys[0]}
            onChange={(date) => setSelectedKeys(date ? [date] : [])}
            style={{ width: 160, marginBottom: 8 }}
          />
          <Space>
            <Button onClick={confirm} type="primary" size="small">Filter</Button>
            <Button onClick={clearFilters} size="small">Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (values, record) => !values.length || moment(record.date).isSame(values[0], "day"),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      sorter: (a, b) => parseFloat(a.total.replace(/[^0-9.-]+/g, "")) - parseFloat(b.total.replace(/[^0-9.-]+/g, "")),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select Total"
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
            style={{ width: 160, marginBottom: 8 }}
            allowClear
          >
            {getUniqueValues(finalSales, "total").map((t) => (
              <Option key={t} value={t}>{t}</Option>
            ))}
          </Select>
          <Space>
            <Button onClick={confirm} type="primary" size="small">Filter</Button>
            <Button onClick={clearFilters} size="small">Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (values, record) => values.includes(record.total),
    },
    {
      title: "Status",
      dataIndex: "isReturn",
      key: "status",
      align: "center",
      filters: [
        { text: "Completed", value: false },
        { text: "Returned", value: true },
      ],
      onFilter: (value, record) => record.isReturn === value,
      render: (isReturn) => <span style={{ color: isReturn ? "red" : "green" }}>{isReturn ? "Returned" : "Completed"}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-1">
          <Button icon={<EyeOutlined />} size="small" type="primary" onClick={() => setSelectedInvoice(record)} />
        </div>
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

          {/* Summary */}
          <div className="flex gap-2 py-3">
            {[
              ["Total Invoices", summary.totalInvoices],
              ["Returned", summary.returnedCount],
              ["Total Amount", formatCurrency(summary.totalAmount)],
              ["Completed Amount", formatCurrency(summary.completedAmount)],
              ["Returned Amount", formatCurrency(summary.returnedAmount)],
            ].map(([title, value], i) => (
              <div className=" sm:w-1/5" key={i}>
                <Card hoverable className="text-center shadow-md">
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-xl font-semibold">{value}</div>
                </Card>
              </div>
            ))}
          </div>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={currentData}
            rowKey="invoice"
            bordered
            pagination={false}
            scroll={{ x: "max-content", y: 400 }}
          />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredSales.length}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={setCurrentPage}
            align="center"
            style={{ marginTop: 20, textAlign: "center" }}
          />

          {/* Invoice Modal */}
          <AnimatePresence>
            {selectedInvoice && <InvoiceModal visible={!!selectedInvoice} invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </ConfigProvider>
  );
}
