import React, { useEffect, useState } from "react";
import {
  Drawer,
  Table,
  Button,
  ConfigProvider,
  theme,
  Skeleton,
  Card,
} from "antd";
import { Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLanguage } from "../../Provider/LanguageContext";
import { generatePDF } from "../../components/PDFmaker";

export default function InvoiceModal({ visible, onClose }) {
  const { darkmode } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!visible) return;

    setLoading(true);

    // simulate API
    setTimeout(() => {
      setInvoice({
        invoice: "INV-1001",
        customer: "محمد حسین",
        date: "2036-01-09",
        driver: "Ahmad",
        discount: "10.00",
        expenses: "5.00",
        previousRemaining: "20.00",
        totalRemaining: "115.00",
        referrer: "Karim",
        note: "Deliver between 10AM-12PM",
        paymentAFN: "5000",
        paymentUSD: "50",
        totalPrice: "123",
        items: Array.from({ length: 20 }, (_, i) => ({
          key: i + 1,
          item: `Product ${i + 1}`,
          description: `Description for product ${i + 1}`,
          unit: "pcs",
          quantity: i + 1,
          unitPrice: `$${(i + 1) * 5}`,
          totalPrice: `$${(i + 1) * (i + 1) * 5}`,
        })),
      });

      setLoading(false);
    }, 3200);
  }, [visible]);

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { title: "Item Name", dataIndex: "item", key: "item", ellipsis: true },
    { title: "Description", dataIndex: "description", key: "description", ellipsis: true },
    { title: "Unit", dataIndex: "unit", key: "unit", width: 60 },
    { title: "Qy", dataIndex: "quantity", key: "quantity", width: 60 },
    { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", width: 90 },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice", width: 100 },
  ];

  const pdfData =
    invoice?.items?.map((item) => ({
      item: item.item,
      description: item.description,
      unit: item.unit,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    })) || [];

  return (
  <ConfigProvider theme={darkmode ? { algorithm: theme.darkAlgorithm } : {}}>
  <AnimatePresence>
    {visible && (
      <Drawer
        placement="left"
        open={visible}
        onClose={onClose}
        bodyStyle={{ padding: 0 }}
        width="100%"
        className="sm:!w-[90%] md:!w-[80%] lg:!w-[800px]"
      >
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className={`min-h-screen p-4 sm:p-6 flex flex-col gap-6
          ${darkmode ? "bg-[#1f1f1f] text-gray-200" : "bg-white text-gray-700"}`}
        >
          {/* ================= HEADER ================= */}
          {loading ? (
            <Skeleton active title={{ width: "90%" }} paragraph={{ rows: 7 }} />
          ) : (
            <div className="grid grid-cols-1 gap-2 pb-4 text-sm border-b sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Customer", invoice.customer],
                ["Date", invoice.date],
                ["Driver", invoice.driver],
                ["Bill #", invoice.invoice],
                ["Discount", invoice.discount],
                ["Expenses", invoice.expenses],
                ["Prev Remaining", invoice.previousRemaining],
                ["Total Remaining", invoice.totalRemaining],
                ["Total", invoice.totalPrice],
                ["Referrer", invoice.referrer || "---"],
                ["Payment AFN", invoice.paymentAFN],
                ["Payment USD", invoice.paymentUSD],
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between gap-2">
                  <span className="font-medium">{label}:</span>
                  <span className="text-right">{value}</span>
                </div>
              ))}

              {invoice.note && (
                <div className="col-span-full">
                  <span className="font-medium">Note:</span>
                  <div className="mt-1 text-sm opacity-90">{invoice.note}</div>
                </div>
              )}
            </div>
          )}

          {/* ================= ITEMS ================= */}

          {/* DESKTOP / TABLET */}
          <div className="hidden sm:block">
            <Table
              columns={columns}
              dataSource={invoice?.items || []}
              loading={loading}
              pagination={false}
              size="small"
              bordered
              scroll={{ x: "max-content", y: 320 }}
            />
          </div>

          {/* MOBILE / CARDS */}
          <div className="flex flex-col gap-3 space-y-3 sm:hidden">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} loading className="shadow-sm" />
                ))
              : invoice?.items?.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg  p-3 text-sm shadow-sm
                    ${darkmode ? "bg-[#333] " : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">Item</span>
                      <span>{item.item}</span>
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="font-medium">Qty</span>
                      <span>{item.quantity}</span>
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="font-medium">Unit</span>
                      <span>{item.unit}</span>
                    </div>

                    <div className="flex justify-between mt-1">
                      <span className="font-medium">Unit Price</span>
                      <span>{item.unitPrice}</span>
                    </div>

                    <div className="flex justify-between pt-2 mt-2 font-semibold border-t">
                      <span>Total</span>
                      <span>{item.totalPrice}</span>
                    </div>
                  </div>
                ))}
          </div>

          {/* ================= ACTION ================= */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {loading ? (
              <Skeleton.Button active block />
            ) : (
              <Button
                type="primary"
                size="large"
                className="w-full sm:w-auto"
                icon={<Printer size={18} />}
                onClick={() =>
                  generatePDF({
                    title: `Invoice #${invoice.invoice}`,
                    fileName: `invoice-${invoice.invoice}.pdf`,
                    data: pdfData,
                    columns: [
                      { key: "item", label: "Item Name" },
                      { key: "description", label: "Description" },
                      { key: "unit", label: "Unit" },
                      { key: "quantity", label: "Quantity" },
                      { key: "unitPrice", label: "Unit Price" },
                      { key: "totalPrice", label: "Total Price" },
                    ],
                    showTotal: true,
                    totalColumn: "totalPrice",
                  })
                }
              >
                Print PDF
              </Button>
            )}
          </div>
        </motion.div>
      </Drawer>
    )}
  </AnimatePresence>
</ConfigProvider>

  );
}
