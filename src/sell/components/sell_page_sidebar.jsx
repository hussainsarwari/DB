import React, { useState } from "react";
import { DollarSign, Calendar, ClipboardList, Gift, Truck } from "lucide-react";
import {
  Receipt,
  Store,
  Printer,
  ShoppingCart,
  Notebook,
} from "lucide-react";
import QRCode from "react-qr-code";
import dayjs from "dayjs";
import { BsWhatsapp } from "react-icons/bs";
import { useLanguage } from "../../Provider/LanguageContext";

export default  function SidebarSales({
  totalPurchase,
  selectedcustomer,
  itemsList
}) {
  const [paymentAFN, setPaymentAN] = useState(0);
  const [paymentUSD, setPaymentUSD] = useState(0);
 const [currencyRate, setCurrencyRate] = useState(85); // Example: 1 USD = 85 AFN
 const store = {
    name: "My Store",
    whatsapp: "+93797542547",
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
    tagline: "Your Trusted Store",
  },
  customer = {
    name: selectedcustomer ,
    lastname: "Richard Doe",
    PhoneNumber: "+93 766805049",
  };
function totalRemainingfunction() {
  const expenses = Number(Expenses);
  const total = Number(totalPurchase);
  const disc = Number(discount);
  const remain = Number(remaining);
  const paidAFN = Number(paymentAFN);
  const paidUSD = Number(paymentUSD);

  return expenses + total - disc + remain - paidAFN - paidUSD* currencyRate;
}

 const registers = [
    { id: "main", label: "Select your Register" },
    { id: "drawer-1", label: "Register 1" },
    { id: "drawer-2", label: "Register 2" },
  ],
  onSell = (payload) => {};
  const { darkmode, t, dir } = useLanguage();
  const [selectedRegister, setSelectedRegister] = useState(
    registers[0]?.id || ""
  );
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [billNumber, setBillNumber] = useState("");
  const [Note, setNote] = useState("");
  const [working, setWorking] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [Expenses, setExpenses] = useState(0);
  const [message, setMessage] = useState(
    "Thank you for your excellent service! سلام عشقم این پیام  یک متن تستیه که ببینی درست کار میکنه یا نه"
  );
  // Logistics
  const [selectedDriver, setSelectedDriver] = useState("");
  const [showCustomDriver, setShowCustomDriver] = useState(false);
  const [customDriverName, setCustomDriverName] = useState("");
  const drivers = [
    { id: 1, name: "Ahmad" },
    { id: 2, name: "Karim" },
    { id: 3, name: "Sami" },
    { id: 4, name: "Latif" },
  ];
  const remaining = 100;

  const whatsappMessage = ({ customer, billNumber }) => `
*Customer Name:* ${customer.name}
*lastName:* ${customer.lastname}
*Bill Number:* ${billNumber}

${message}
`;

  const storeWhatsapp = store?.whatsapp || "";
  const cleanNumber = storeWhatsapp.replace(/[^0-9]/g, "");
  const qrData = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(
    whatsappMessage({ customer, billNumber })
  )}`;

  const buildPayload = () => ({
    totalPurchase,
    remaining,
    totalRemainingfunction,
    register: selectedRegister,
    date,
    billNumber,
  });

  const handleSell = async () => {
    setWorking(true);
    try {
      await onSell(buildPayload());
    } finally {
      setWorking(false);
    }
  };

  const handlePrint = async () => {
    setWorking(true);
    try {
      setTimeout(() => window.print(), 500);
    } finally {
      setWorking(false);
    }
  };

const sendBillToWhatsapp = async () => {
  try {
    const customerNumber = customer.PhoneNumber.replace(/[^0-9]/g, "");

    // ساخت لیست محصولات
    const productList = itemsList
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - ${item.quantity} ${item.unit} x ${item.unitPrice.toLocaleString()} USD = ${(item.quantity * item.unitPrice).toLocaleString()} USD`
      )
      .join("\n");

    // جمع کل و مقادیر پرداختی
    const total = totalPurchase || 0;
    const discountAmount = discount || 0;
    const shippingCost = Expenses || 0;
    const finalTotal = totalRemainingfunction(); // مجموع باقی‌داری جدید

    // مبلغ پرداخت شده به دلار ضرب در نرخ دلار
    const paymentUSDInLocal = paymentUSD ;

    // پیام WhatsApp حرفه‌ای
    const msg = `
سلام ${customer.name} وقت شما بخیر,

✅ خرید شما با موفقیت ثبت شد!

📅 تاریخ: ${dayjs().format("DD MMM YYYY")}
🧾 شماره فاکتور: ${billNumber}

===================================================
🛒 لیست خرید:
${productList}
===================================================
مجموع خرید: ${total.toLocaleString()} 
 تخفیف: ${discountAmount.toLocaleString()} 
 کرایه ارسال: ${shippingCost.toLocaleString()} 
 باقی‌داری گذشته: ${remaining.toLocaleString()} 
===================================================
مبلغ پرداخت شده:
   به افغانی: ${paymentAFN.toLocaleString()} AFG
   به دلار (ضرب در نرخ ${currencyRate}): ${paymentUSDInLocal.toLocaleString()} 
===================================================
💳 مجموع باقی‌داری جدید شما: ${finalTotal.toLocaleString()} 
===================================================


🏢 مشخصات شرکت  تکنالوژی راحت:

📍 آدرس دفتر مرکزی: کابل، افغانستان
📞 تلفن پشتیبانی: 0700XXXXXX
📱 واتساپ پشتیبانی: 0700XXXXXX
🌐 وب‌سایت رسمی: www.raacht.com

🔗 شبکه‌های اجتماعی:
   - اینستاگرام: https://instagram.com/raacht
   - تلگرام: https://t.me/raacht
   - فیسبوک: https://facebook.com/raacht
   - لینکدین: https://linkedin.com/company/raacht

------------------------------------------------------------
تولید شده توسط نرم‌افزار راحت
با نرم‌افزار راحت، سرعت، دقت و کیفیت را تجربه کنید!
 نرم‌افزار راحت، تجربه‌ای حرفه‌ای و مطمئن برای مدیریت فروش و فاکتورها ارائه می‌دهد.




`;

    // باز کردن WhatsApp
    window.open(
      `https://api.whatsapp.com/send?phone=${customerNumber}&text=${encodeURIComponent(
        msg
      )}`,
      "_blank"
    );
  } finally {
    setWorking(false);
  }
};


  const bgClass = darkmode
    ? "bg-gray-900 text-gray-200"
    : "bg-white text-gray-800";
  const inputClass = darkmode
    ? "w-full px-3 py-1 my-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-gray-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    : "w-full px-3 py-1 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-1 focus:ring-blue-200 focus:outline-none";

  const btnPrimary = darkmode
    ? "flex items-center px-7 cursor-pointer  justify-center gap-2 py-1 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-60"
    : "flex items-center px-7 cursor-pointer justify-center gap-2 py-1 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60";

  const btnSecondary = darkmode
    ? "flex items-center justify-center gap-2 w-full md:w-fit py-1 px-5 cursor-pointer font-medium text-blue-400 bg-gray-800 border border-blue-400 rounded-lg hover:bg-gray-700 disabled:opacity-60"
    : "flex items-center justify-center gap-1 w-full md:w-fit text-sm py-2 cursor-pointer px-2 font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-gray-50 disabled:opacity-60";

  let items = [
    { name: "Product A", qty: 2, price: 50 },
    { name: "Product B", qty: 1, price: 100 },
    { name: "Product C", qty: 3, price: 30 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
    { name: "Product D", qty: 5, price: 20 },
  ];
  return (
    <div
      className={`md:w-[400px] w-full relative  mx-auto p-6 flex flex-col gap-5 shadow-lg rounded-xl    print-area ${bgClass}`}
    >
      <div
        className={`hidden    w-full gap-2 p-1 print-header border-b border-gray-300 ${" text-gray-900"}`}
      >
        {/* 1. Logo + Company Info */}
        <div className="flex items-center justify-between gap-1 pb-1 ">
          <div className="flex flex-col">
            <span className="text-lg font-semibold ">
              {store.name || "Company Name"}
            </span>
            <span className="text-xs text-gray-500">
              {store.phone || "000-000-0000"}
            </span>
            <span className="text-xs text-gray-500">
              {store.address || "Company Address"}
            </span>
            <span className="text-xs italic text-gray-400">
              {store.tagline || "Your Trusted Store"}
            </span>
          </div>
          <img
            src="data:image/png;base64,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"
            alt={`${store.name} Logo`}
            className="object-contain w-20 h-20"
          />
        </div>

        {/* 5. Date */}
        <div className="flex justify-between mt-2 text-sm">
          <span className="font-medium">Date:</span>
          <span>{dayjs(date).format("DD MMM YYYY")}</span>
        </div>

        {/* 6. Customer */}
        <div className="flex justify-between text-sm">
          <span className="font-medium">Name:</span>
          <span>{customer.name || "---"}</span>
        </div>

        {/* last Name */}
        <div className="flex justify-between text-sm">
          <span className="font-medium">Last Name:</span>
          <span>{customer.lastname || "---"}</span>
        </div>

        {/* Bill Number */}
        <div className="flex justify-between text-sm">
          <span className="font-medium">Bill Number:</span>
          <span>{billNumber || "---"}</span>
        </div>
        {/* driver name */}
        <div className="flex justify-between text-sm">
          <span className="font-medium">Driver name:</span>
          <span>{selectedDriver || customDriverName || "---"}</span>
        </div>

        {/* Note */}
        {Note && (
          <div className="flex justify-between mt-1 text-sm">
            <span className="font-medium">Note:</span>
            <span>{Note}</span>
          </div>
        )}
      </div>

      <div className={`flex flex-col gap-2 py-2 mb-3  no-print `}>
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span>${totalPurchase }</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount:</span>
          <span>${discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Expenses:</span>
          <span>${Expenses}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Remaining:</span>
          <span>${remaining.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-500">
          <span>Total Remaining:</span>
          <span>${totalRemainingfunction()}</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex flex-col w-full gap-2">
        <div className="grid grid-cols-2 gap-2 mb-2 no-print">
          <div className="gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputClass} no-print`}
            />
          </div>

          <div className="gap-2">
            <input
              type="text"
              value={billNumber}
              onChange={(e) => setBillNumber(e.target.value)}
              placeholder="bill #"
              className={`${inputClass} no-print`}
            />
          </div>
          {/* payment amount */}
          <div className="gap-2">
            <input
              type="number"
              min={0}
              onChange={(e) => setPaymentAN(e.target.value)}
              placeholder="Payment(AFN)"
              className={`${inputClass} no-print`}
            />
          </div>
          <div className="gap-2">
            <input
              type="number"
             min={0}
             onChange={(e) => setPaymentUSD(e.target.value)}
              placeholder="Payment(usd)"
              className={`${inputClass} no-print`}
            />
          </div>
        
          {/* register select */}
          <div className="col-start-1 col-end-3 gap-2">
            <label
              htmlFor="select_register"
              className="text-[12px] text-gray-500"
            >
              Select Register
            </label>
            <select
              id="select_register"
              name="select_register"
              value={selectedRegister}
              onChange={(e) => setSelectedRegister(e.target.value)}
              className={`${inputClass} no-print`}
            >
              {registers.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* discount */}
          <div
            className={`${inputClass} no-print  outline-none  active:border-0`}
          >
            <select name="discount" id="discount">
              <option value="number">amount</option>
              <option value="%">%</option>
            </select>
          </div>
          <div className="gap-2">
            <input
              type="number"
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
              placeholder="discount"
              className={`${inputClass} no-print`}
            />
          </div>

          {/* Driver & Delivery Fee */}
          <div
            className={`${inputClass} no-print border outline-none flex items-center justify-center active:border-0`}
          >
            <select
              value={selectedDriver}
              onChange={(e) => {
                if (e.target.value === "other") {
                  setShowCustomDriver(true);
                } else {
                  setSelectedDriver(e.target.value);
                  setShowCustomDriver(false);
                }
              }}
              className="w-full"
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
              <option value="other">Other...</option>
            </select>
          </div>

          {showCustomDriver && (
            <input
              type="text"
              value={customDriverName}
              onChange={(e) => setCustomDriverName(e.target.value)}
              placeholder=" Driver Name"
              className={inputClass}
            />
          )}
          {!showCustomDriver && (
            <input
              type="number"
              value={Expenses}
              
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="Delivery Fee"
              className={inputClass}
            />
          )}
        </div>
        <div className="gap-2 my-5">
          <textarea
            rows={1}
            value={Note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            className={`${inputClass} no-print`}
          ></textarea>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2 my-2 no-print">
          <button
            onClick={handleSell}
            disabled={working}
            className={btnPrimary}
          >
            <ShoppingCart size={16} /> {working ? "..." : "Sell"}
          </button>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handlePrint}
              disabled={working}
              className={btnSecondary}
            >
              <Printer size={16} /> {working ? "..." : "sell & Print"}
            </button>
            <button
              onClick={sendBillToWhatsapp}
              disabled={working}
              className={btnSecondary}
            >
              <BsWhatsapp size={16} /> {working ? "..." : "Send WhatsApp"}
            </button>
          </div>
        </div>
      </div>

      {/* Items List - Multi-page Print */}
      <div className="flex-col hidden w-full gap-1 print:flex print:flex-col print:gap-1 print:border-none">
        <div className="flex flex-col w-full gap-1 print:flex print:flex-col print:gap-1 ">
          {/* Table Header */}
          <div className="flex text-sm j print:font-bold print:text-gray-800 print:border-b print:text-center print:items-center print:bg-gray-100">
            <span className="w-1/2 print:w-1/2">Item</span>
            <span className="w-1/6 text-center print:text-center">Qty</span>
            <span className="w-1/6 text-right print:text-right">Price</span>
            <span className="w-1/6 text-right print:text-right">Total</span>
          </div>

          {/* Table Rows */}
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 text-sm border-b border-gray-100 print:flex print:justify-between print:py-2 print:text-gray-700 print:border-b print:border-gray-200 [break-inside:avoid]"
            >
              <span className="w-1/2 print:w-1/2">{item.name}</span>
              <span className="w-1/6 text-center print:text-center">
                {item.qty}
              </span>
              <span className="w-1/6 text-right print:text-right">
                ${item.price.toLocaleString()}
              </span>
              <span className="w-1/6 text-right print:text-right">
                ${(item.qty * item.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer QR */}
      <div className="fixed bottom-0 left-0 hidden w-full px-5 pt-5 border-t border-gray-300 print:flex-col print-footer">
        <div
          className={`flex items-center justify-between w-full gap-5 ${dir}`}
        >
          <div className="flex flex-col justify-end mt-5">
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span>${(totalPurchase || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Remaining:</span>
              <span>${remaining.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount:</span>
              <span>${discount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Expenses:</span>
              <span>${Expenses}</span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t border-gray-600">
              <span>Total Remaining:</span>
              <span>${totalRemainingfunction()}</span>
            </div>
          </div>
          <QRCode value={qrData} size={120} />
        </div>
        <h1>Generated by Rahat System</h1>
      </div>
    </div>
  );
}
