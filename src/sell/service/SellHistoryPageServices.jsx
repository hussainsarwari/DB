/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import { message, Input, List, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLanguage } from "../../Provider/LanguageContext";

export default function useSellPageService({
  currentPage,
  salesData,
  dateRange,
  pageSize,
  setCurrentPage,
  setSelectedInvoice,
}) {
  const { SellPageHistory } = useLanguage();
  const [importedSales, setImportedSales] = useState(null);
  const [tableFilters, setTableFilters] = useState({});

  const staticSales = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        invoice: `INV-${1000 + i}`,
        customer: `Customer ${i + 1}`, // داده‌های استاتیک نیستند => ترجمه نمی‌شوند
        date: `2036-01-${String((i % 30) + 1).padStart(2, "0")}`,
        total: `$${(100 + i * 10).toFixed(2)}`,
        isReturn: i % 8 === 0,
      })),
    []
  );

  const processedSales = useMemo(() => {
    const source = importedSales || salesData || staticSales;
    return source.map((item) => ({
      ...item,
      dateTs: item.date ? new Date(item.date).getTime() : 0,
      totalNum: Number(item.total?.replace(/[^0-9.-]+/g, "")) || 0,
    }));
  }, [importedSales, salesData, staticSales]);

  const filteredSales = useMemo(() => {
    let data = processedSales;
    if (dateRange.length === 2) {
      const start = dateRange[0].startOf("day").valueOf();
      const end = dateRange[1].endOf("day").valueOf();
      data = data.filter((s) => s.dateTs >= start && s.dateTs <= end);
    }
    for (const [key, values] of Object.entries(tableFilters)) {
      if (values?.length) {
        const set = new Set(values);
        data = data.filter((item) => set.has(item[key]));
      }
    }
    return [...data].sort((a, b) => b.dateTs - a.dateTs);
  }, [processedSales, dateRange, tableFilters]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSales.slice(start, start + pageSize);
  }, [filteredSales, currentPage, pageSize]);

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
          customer: row.Customer || SellPageHistory.unknown,
          date: row.Date,
          total: `$${Number(row.Total).toFixed(2)}`,
          isReturn: row.Status === SellPageHistory.statusReturned,
        }));
        if (!mapped.length) return message.error(SellPageHistory.invalidFile);
        setImportedSales(mapped);
        message.success(
          SellPageHistory.backupImported.replace("{count}", mapped.length)
        );
        e.target.value = "";
      } catch {
        message.error(SellPageHistory.importFailed);
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
      Status: s.isReturn
        ? SellPageHistory.statusReturned
        : SellPageHistory.statusCompleted,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, SellPageHistory.sellHistory);
    XLSX.writeFile(
      workbook,
      `${SellPageHistory.sellHistory}-${new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:T]/g, "-")}.xlsx`
    );
    message.success(SellPageHistory.backupCreated);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      value
    );

  const summary = useMemo(() => {
    return filteredSales.reduce(
      (acc, s) => {
        acc.totalInvoices++;
        acc.totalAmount += s.totalNum;
        if (s.isReturn) {
          acc.returnedCount++;
          acc.returnedAmount += s.totalNum;
        } else {
          acc.completedAmount += s.totalNum;
        }
        return acc;
      },
      {
        totalInvoices: 0,
        returnedCount: 0,
        totalAmount: 0,
        completedAmount: 0,
        returnedAmount: 0,
      }
    );
  }, [filteredSales]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredSales, setCurrentPage]);

  const getColumnSearchProps = (dataIndex, dataSource) => {
    const searchInputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const suggestions = useMemo(() => {
      if (!inputValue) return [];
      const lower = inputValue.toLowerCase();
      return dataSource
        .map((item) => item[dataIndex])
        .filter(Boolean)
        .filter((v) => v.toString().toLowerCase().includes(lower))
        .slice(0, 10);
    }, [inputValue, dataIndex, dataSource]);

    return {
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8, width: 260 }}>
          <Input
            ref={searchInputRef}
            placeholder={SellPageHistory.search}
            value={inputValue}
            allowClear
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              setSelectedKeys(val ? [val] : []);
            }}
            onPressEnter={() => confirm({ closeDropdown: true })}
          />
          {suggestions.length > 0 && (
            <List
              size="small"
              style={{ marginTop: 6, maxHeight: 160, overflow: "auto" }}
              bordered
              dataSource={suggestions}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setInputValue(item);
                    setSelectedKeys([item]);
                    confirm({ closeDropdown: true });
                  }}
                >
                  {item}
                </List.Item>
              )}
            />
          )}
          <Space size="small" style={{ marginTop: 8 }}>
            <Button
              type="primary"
              size="small"
              icon={<SearchOutlined />}
              onClick={() => confirm({ closeDropdown: true })}
            >
              {SellPageHistory.search}
            </Button>
            <Button
              size="small"
              onClick={() => {
                clearFilters?.();
                setInputValue("");
                confirm({ closeDropdown: false });
              }}
            >
              {SellPageHistory.reset}
            </Button>
            <Button type="link" size="small" onClick={close}>
              {SellPageHistory.close}
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
      filterDropdownProps: {
        onOpenChange(open) {
          if (open) setTimeout(() => searchInputRef.current?.focus(), 100);
        },
      },
    };
  };

  const columns = [
    {
      title: SellPageHistory.invoice,
      dataIndex: "invoice",
      key: "invoice",
      align: "center",
      width: 120,
      ...getColumnSearchProps("invoice", processedSales),
    },
    {
      title: SellPageHistory.customer,
      dataIndex: "customer",
      key: "customer",
      align: "center",
      width: 150,
      ...getColumnSearchProps("customer", processedSales),
    },
    {
      title: SellPageHistory.date,
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 120,
      sorter: (a, b) => a.dateTs - b.dateTs,
      ...getColumnSearchProps("date", processedSales),
    },
    {
      title: SellPageHistory.total,
      dataIndex: "total",
      key: "total",
      align: "center",
      width: 120,
      sorter: (a, b) => a.totalNum - b.totalNum,
      ...getColumnSearchProps("total"),
    },
    {
      title: SellPageHistory.status,
      dataIndex: "isReturn",
      key: "status",
      align: "center",
      width: 100,
      filters: [
        { text: SellPageHistory.statusCompleted, value: false },
        { text: SellPageHistory.returned, value: true },
      ],
      onFilter: (value, record) => record.isReturn === value,
      render: (isReturn) => (
        <span style={{ color: isReturn ? "red" : "green" }}>
          {isReturn ? SellPageHistory.statusReturned : SellPageHistory.statusCompleted}
        </span>
      ),
    },
    {
      title: SellPageHistory.action,
      key: "action",
      align: "center",
      width: 60,
      render: (_, record) => (
        <button
          className="flex justify-center w-full"
          onClick={() => setSelectedInvoice(record)}
        >
          <span className="w-full px-2 py-2 box">{SellPageHistory.details}</span>
        </button>
      ),
    },
  ];

  const columnFilters = useMemo(() => {
  const map = {
    invoice: new Set(),
    customer: new Set(),
    date: new Set(),
    total: new Set(),
  };
  processedSales.forEach((item) => {
    map.invoice.add(item.invoice);
    map.customer.add(item.customer);
    map.date.add(item.date);
    map.total.add(item.total);
  });
  return Object.fromEntries(
    Object.entries(map).map(([k, set]) => [
      k,
      [...set].map((v) => ({ text: v, value: v })),
    ])
  );
}, [processedSales]);
const handleColumnFilter = (key, values) => {
  setTableFilters((prev) => ({ ...prev, [key]: values }));
};

  
  return {
    columnFilters,
    columns,
    handleColumnFilter,
    summary,
    formatCurrency,
    handleBackup,
    handleImportBackup,
    currentData,
    filteredSales,
  };
}
