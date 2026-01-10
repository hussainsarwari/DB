import React from "react";
import { Drawer, Table, Button } from "antd";
import { Printer } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function InvoiceModal({ visible, onClose }) {
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
    <AnimatePresence>
      {visible && (
        <Drawer
          width={Math.min(window.innerWidth - 40, 800)}
          placement="right"
          onClose={onClose}
          open={visible}
          className="p-0 text-gray-900"
          bodyStyle={{ padding: 0 }}
        >
          <motion.div
            key="invoice-modal"
            initial={{ opacity: 0, x: 100, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, duration: 4.9 }}
            className="p-6 bg-white flex flex-col gap-6 min-h-[400px]"
          >
            {/* Customer & Invoice Info */}
            <motion.div
              className="grid grid-cols-1 gap-3 pb-3 text-sm border-b border-gray-200 sm:grid-cols-2 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* اطلاعات مشتری */}
              {[
                ["Customer", invoice.customer],
                ["Date", invoice.date],
                ["Driver", invoice.driver],
                ["Bill #", invoice.invoice],
                ["Discount", invoice.discount],
                ["Expenses", invoice.expenses],
                ["Prev Remaining", invoice.previousRemaining],
                ["Total Remaining", invoice.totalRemaining],
                ["Referrer", invoice.referrer || "---"],
                ["Payment AFN", invoice.paymentAFN],
                ["Payment USD", invoice.paymentUSD],
              ].map(([label, value], i) => (
                <div className="flex justify-between" key={i}>
                  <span className="font-medium">{label}:</span>
                  <span className="ml-2 text-gray-700 truncate">{value}</span>
                </div>
              ))}

              {invoice.note && (
                <div className="flex justify-between col-span-1 sm:col-span-2 md:col-span-3">
                  <span className="font-medium">Note:</span>
                  <span className="ml-2 text-gray-700">{invoice.note}</span>
                </div>
              )}
            </motion.div>

            {/* Items Table */}
            <motion.div
              className="overflow-x-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 20,  duration:1}}
            >
              <Table
                columns={columns}
                dataSource={invoice.items}
                pagination={false}
                size="small"
                bordered
                scroll={{ y: 300 }}
                className="bg-gray-50"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 20 }}
            >
              <Button type="primary">
                <Printer size={20}/> Print
              </Button>
            </motion.div>
          </motion.div>
        </Drawer>
      )}
    </AnimatePresence>
  );
}
