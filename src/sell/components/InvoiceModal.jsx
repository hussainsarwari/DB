import React from "react";
import { Drawer, Table, Button } from "antd";

export default function InvoiceModal({ visible, onClose }) {
  // داده فیک برای تست
  const invoice = {
    invoice: "INV-1001",
    customer: "John Doe",
    date: "2036-01-09",
    driver: "Ahmad",
    discount: "$10.00",
    expenses: "$5.00",
    previousRemaining: "$20.00",
    totalRemaining: "$115.00",
    referrer: "Karim",
    note: "Deliver between 10AM-12PM",
    paymentAFN: "5000",
    paymentUSD: "50",
    items: Array.from({ length: 20 }, (_, i) => ({
      key: i + 1,
      item: `Product ${String.fromCharCode(65 + (i % 26))}`,
      description: `Description for product ${i + 1}`,
      unit: "pcs",
      quantity: i + 1,
      unitPrice: `$${(i + 1) * 5}`,
      totalPrice: `$${(i + 1) * (i + 1) * 5}`,
    })),
  };

  const columns = [
    { title: "Item Name", dataIndex: "item", key: "item", ellipsis: true },
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
    { title: "Unit", dataIndex: "unit", key: "unit", width: 60 },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: 60 },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", width: 90 },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice", width: 100 },
  ];


  return (
    <Drawer
      width={Math.min(window.innerWidth - 40, 800)}
      placement="right"
      onClose={onClose}
      open={visible}
      className="p-0 text-gray-900"
    >
      <div
        id="invoice-content"
        className="p-6 bg-white flex flex-col gap-6 min-h-[400px]"
      >
        {/* Customer & Invoice Info */}
      <div className="grid grid-cols-1 gap-3 pb-3 text-sm border-b border-gray-200 sm:grid-cols-2 md:grid-cols-3">
  <div className="flex justify-between">
    <span className="font-medium">Customer:</span>
    <span className="ml-2 text-gray-700 truncate">{invoice.customer}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Date:</span>
    <span className="ml-2 text-gray-700">{invoice.date}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Driver:</span>
    <span className="ml-2 text-gray-700">{invoice.driver}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Bill #:</span>
    <span className="ml-2 text-gray-700">{invoice.invoice}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Discount:</span>
    <span className="ml-2 text-gray-700">{invoice.discount}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Expenses:</span>
    <span className="ml-2 text-gray-700">{invoice.expenses}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Prev Remaining:</span>
    <span className="ml-2 text-gray-700">{invoice.previousRemaining}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Total Remaining:</span>
    <span className="ml-2 text-gray-700">{invoice.totalRemaining}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Referrer:</span>
    <span className="ml-2 text-gray-700">{invoice.referrer || "---"}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Payment AFN:</span>
    <span className="ml-2 text-gray-700">{invoice.paymentAFN}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Payment USD:</span>
    <span className="ml-2 text-gray-700">{invoice.paymentUSD}</span>
  </div>
  {invoice.note && (
    <div className="flex justify-between col-span-1 sm:col-span-2 md:col-span-3">
      <span className="font-medium">Note:</span>
      <span className="ml-2 text-gray-700">{invoice.note}</span>
    </div>
  )}
</div>


        {/* Items Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={invoice.items}
            pagination={false}
            size="small"
            bordered
            scroll={{ y: 300 }}
            className="bg-gray-50"
          />
        </div>

      
      </div>
    </Drawer>
  );
}
