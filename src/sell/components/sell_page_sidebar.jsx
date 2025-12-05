import React, { useState } from "react";
import { Calendar, Receipt, Store, Printer, ShoppingCart } from "lucide-react";
import QRCode from "react-qr-code";

export default function SidebarSales({
  store = {
    name: "My Store",
    logo: "data:image/png;base64,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", // لوگو از اینترنت
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
    tagline: "Your Trusted Store",
  },
  customer = { name: "John Doe", fatherName: "Richard Doe" },
  initialTotal = 0,
  initialRemaining = 0,
  registers = [
    { id: "main", label: "Main Register" },
    { id: "drawer-1", label: "Register 1" },
    { id: "drawer-2", label: "Register 2" },
  ],
  onSell = (payload) => {},
}) {
  const [selectedRegister, setSelectedRegister] = useState(
    registers[0]?.id || ""
  );
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [billNumber, setBillNumber] = useState("");
  const [working, setWorking] = useState(false);

  const totalPurchase = initialTotal;
  const remaining = initialRemaining;

  const qrData = JSON.stringify({
    store: store.name,
    billNumber,
    date,
    customerName: customer.name,
    fatherName: customer.fatherName,
    totalPurchase,
    remaining,
  });

  function buildPayload() {
    return {
      totalPurchase,
      remaining,
      register: selectedRegister,
      date,
      billNumber,
    };
  }

  async function handleSell() {
    setWorking(true);
    try {
      await onSell(buildPayload());
    } finally {
      setWorking(false);
    }
  }

  async function handlePrint() {
    setWorking(true);
    try {
      setTimeout(() => window.print(), 500);
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="w-full max-w-[300px] mx-auto p-6 bg-white flex flex-col gap-3 shadow-lg rounded-xl print-area">
      {/* Header - فقط چاپ */}
      <div className="items-center justify-between hidden w-full gap-2 pb-4 border-b border-gray-300 print:flex">
        <div className="flex flex-col items-start ">
          <h1 className="text-2xl font-bold">{store.name}</h1>
          <div className="text-sm text-gray-700">Phone: {store.phone}</div>
          <div className="text-sm text-center text-gray-700">
            {store.address}
          </div>
          <div className="text-xs italic text-gray-500">{store.tagline}</div>
            <div className="flex justify-between">
            <span>Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex justify-between">
            <span>Bill #:</span>
            <span>{billNumber || "---"}</span>
          </div>
        </div>
        <img
          src={store.logo}
          alt="Store Logo"
          className="object-contain w-20 h-20"
        />
      </div>

      {/* Purchase / Remaining */}
      <div className="flex flex-col gap-2 py-2 mb-3 text-gray-800 border-b border-gray-300">
        <div className="flex justify-between text-sm">
          <span>Purchase:</span>
          <span>${totalPurchase.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Remaining:</span>
          <span>${remaining.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>Total Remaining:</span>
          <span>${remaining.toLocaleString()}</span>
        </div>
      </div>

      {/* Inputs - فقط مدیریت */}
      <div className="flex flex-col gap-3 mb-6 no-print">
        {[
          {
            label: "Select Register",
            icon: <Store size={16} />,
            element: (
              <select
                value={selectedRegister}
                onChange={(e) => setSelectedRegister(e.target.value)}
                className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-200 focus:outline-none"
              >
                {registers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            ),
          },
          {
            label: "Date",
            icon: <Calendar size={16} />,
            element: (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            ),
          },
          {
            label: "Bill Number",
            icon: <Receipt size={16} />,
            element: (
              <input
                type="text"
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                placeholder="e.g., 12345"
                className="w-full px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-200 focus:outline-none"
              />
            ),
          },
        ].map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="flex items-center gap-1 text-sm text-gray-500">
              {field.icon} {field.label}
            </label>
            {field.element}
          </div>
        ))}
      </div>

      {/* Buttons - مدیریت */}
      <div className="flex flex-col gap-2 my-4 no-print">
        <button
          onClick={handleSell}
          disabled={working}
          className="flex items-center justify-center gap-2 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          <ShoppingCart size={16} /> {working ? "..." : "Sell"}
        </button>
        <button
          onClick={handlePrint}
          disabled={working}
          className="flex items-center justify-center gap-2 py-2 font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-gray-50 disabled:opacity-60"
        >
          <Printer size={16} /> {working ? "..." : "Print"}
        </button>
      </div>

      {/* Footer - فقط چاپ */}

      <div className="hidden w-full print:flex-col print-footer">
        <div className="flex items-center justify-between gap-5">

        <QRCode value={qrData} size={120} />
        <div className="flex flex-col justify-end mt-5">
        
          <div className="flex justify-between">
            <span>Customer:</span>
            <span>{customer.name || "---"}</span>
          </div>
          <div className="flex justify-between">
            <span>Father Name:</span>
            <span>{customer.fatherName || "---"}</span>
          </div>
          <div className="mt-2 text-sm font-medium text-center">Scan to view full bill</div>
          <div className="mt-1 text-xs italic text-gray-500">  All details are encoded in QR  </div>
        </div>
        </div>
        <h1>Generated by Rahat System</h1>
      </div>
    </div>
  );
}
