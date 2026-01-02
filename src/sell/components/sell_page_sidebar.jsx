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

const { darkmode, t, dir } = useLanguage();
 const registers = [
    { id: "main", label: t.sell_side_bar.selectRegister },
    { id: "drawer-1", label: "Register 1" },
    { id: "drawer-2", label: "Register 2" },
  ],
  onSell = (payload) => {};
  const [selectedRegister, setSelectedRegister] = useState(
    registers[0]?.id || ""
  );
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [billNumber, setBillNumber] = useState("");
  const [Note, setNote] = useState("");
  const [working, setWorking] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [Expenses, setExpenses] = useState(0);
// dicount flag = it shows that it is number or %
const [isDiscountNumber,setIsDiscountNumber]=useState(true)
  
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
 تخفیف ${isDiscountNumber?"#":"%"}: ${discountAmount.toLocaleString()} 
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
    ? "flex items-center justify-center gap-1 w-full md:w-fit py-1 px-2 cursor-pointer font-medium text-blue-400 bg-gray-800 border border-blue-400 rounded-lg hover:bg-gray-700 disabled:opacity-60"
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
    className={`md:w-[470px] w-full relative mx-auto p-6 flex flex-col gap-5 shadow-lg rounded-xl h-fit print-area ${bgClass}`}
  >
    {/* ================= PRINT HEADER ================= */}
    <div className="hidden w-full gap-2 p-2 text-gray-900 border-b border-gray-300 print-header">
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">
            {store.name || t.sell_side_bar.companyName}
          </span>
          <span className="text-xs text-gray-500">
            {store.phone || t.sell_side_bar.companyPhone}
          </span>
          <span className="text-xs text-gray-500">
            {store.address || t.sell_side_bar.companyAddress}
          </span>
          <span className="text-xs italic text-gray-400">
            {store.tagline || t.sell_side_bar.companyTagline}
          </span>
        </div>
        <img
          src="data:image/png;base64,..."
          alt={t.sell_side_bar.companyLogoAlt}
          className="object-contain w-20 h-20"
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">{t.sell_side_bar.date}:</span>
        <span>{dayjs(date).format("DD MMM YYYY")}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">{t.sell_side_bar.name}:</span>
        <span>{customer.name || "---"}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">{t.sell_side_bar.lastName}:</span>
        <span>{customer.lastname || "---"}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">{t.sell_side_bar.billNumber}:</span>
        <span>{billNumber || "---"}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="font-medium">{t.sell_side_bar.driverName}:</span>
        <span>{selectedDriver || customDriverName || "---"}</span>
      </div>

      {Note && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{t.sell_side_bar.note}:</span>
          <span>{Note}</span>
        </div>
      )}
    </div>

    {/* ================= SUMMARY ================= */}
    <div className="flex flex-col gap-2 py-2 no-print">
      <div className="flex justify-between text-sm">
        <span>{t.sell_side_bar.total}:</span>
        <span>{totalPurchase}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t.sell_side_bar.discount}{isDiscountNumber?"#":"%"}</span>
        <span>{discount}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t.sell_side_bar.expenses}:</span>
        <span>{Expenses}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t.sell_side_bar.remaining}:</span>
        <span>{remaining.toLocaleString()}</span>
      </div>
      <div className="flex justify-between pt-1 text-base font-semibold border-t border-gray-500">
        <span>{t.sell_side_bar.totalRemaining}:</span>
        <span>{totalRemainingfunction()}</span>
      </div>
    </div>

    {/* ================= INPUTS ================= */}
    <div className="flex flex-col gap-3 no-print">
      <div className="grid grid-cols-2 gap-3">

        <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />

        <input
          type="text"
          value={billNumber}
          onChange={e => setBillNumber(e.target.value)}
          placeholder={t.sell_side_bar.billNumber}
          className={`${inputClass} text-center`}
        />

        <input
          type="number"
          min={0}
          onChange={e => setPaymentAN(e.target.value)}
          placeholder={t.sell_side_bar.paymentAFN}
          className={`${inputClass} text-center`}
        />

        <input
          type="number"
          min={0}
          onChange={e => setPaymentUSD(e.target.value)}
          placeholder={t.sell_side_bar.paymentUSD}
          className={inputClass}
        />

        <select
          value={selectedRegister}
          onChange={e => setSelectedRegister(e.target.value)}
             className={  `w-full px-3 py-2 rounded-md border-1  text-sm outline-none transition 
${darkmode?"bg-gray-800 border-gray-700":"bg-white  border-gray-200"}`}
        >
          {registers.map(r => (
            <option key={r.id} value={r.id} className={`${darkmode? "bg-gray-900":"bg-gray-100"}`}>
              {r.label}
            </option>
          ))}
        </select>

        <select  onChange={(e)=>{
          e.target.value=="%"?setIsDiscountNumber(false):setIsDiscountNumber(true)
        }}     className={  `w-full px-3 py-2 rounded-md border-1  text-sm outline-none transition 
${darkmode?"bg-gray-800 border-gray-700":"bg-white  border-gray-200"}`}>
         <option className={`${darkmode? "bg-gray-900":"bg-gray-100"}`} value="number">{t.sell_side_bar.discountNumber}</option>
          <option className={`${darkmode? "bg-gray-900":"bg-gray-100"}`} value="%">{t.sell_side_bar.discountPercent}</option>
        </select>

        <input
          type="number"
          onChange={e => setDiscount(e.target.value)}
          placeholder={t.sell_side_bar.discount}
          className={inputClass}
        />

        <select
          value={selectedDriver}
          onChange={e => {
            if (e.target.value === "other") {
              setShowCustomDriver(true);
              setSelectedDriver("other");
            } else {
              setSelectedDriver(e.target.value);
              setShowCustomDriver(false);
            }
          }}
          className={  `w-full px-3 py-2 rounded-md border-1  text-sm outline-none transition 
${darkmode?"bg-gray-800 border-gray-700":"bg-white  border-gray-200"}`}
        >
          {drivers.map(d => (
            <option key={d.id} value={d.name} className={`${darkmode? "bg-gray-900":"bg-gray-100"}`}>
              {d.name}
            </option>
          ))}
          <option value="other">{t.sell_side_bar.other}</option>
        </select>

        {showCustomDriver && (
          <input
            type="text"
            value={customDriverName}
            onChange={e => setCustomDriverName(e.target.value)}
            placeholder={t.sell_side_bar.driverPlaceholder}
            className={inputClass}
          />
        )}

        <input
          type="number"
          value={Expenses}
          onChange={e => setExpenses(e.target.value)}
          placeholder={t.sell_side_bar.expenses}
          className={inputClass}
        />
      </div>

      <textarea
        rows={1}
        value={Note}
        onChange={e => setNote(e.target.value)}
        placeholder={t.sell_side_bar.note}
        className={`${inputClass} resize-none`}
      />

      {/* ================= BUTTONS ================= */}
      <button onClick={handleSell} disabled={working} className={btnPrimary}>
        <ShoppingCart size={16} /> {working ? "..." : t.sell_side_bar.sell}
      </button>

<div className="flex justify-between gap-2">
  
      <button onClick={handlePrint} disabled={working} className={btnSecondary}>
        <Printer size={16} /> {working ? "..." : t.sell_side_bar.sellPrint}
      </button>

      <button onClick={sendBillToWhatsapp} disabled={working} className={btnSecondary}>
        <BsWhatsapp size={16} /> {working ? "..." : t.sell_side_bar.sendWhatsapp}
      </button>
</div>
    </div>

    {/* ================= PRINT FOOTER ================= */}
    <div className="fixed bottom-0 left-0 hidden w-full px-5 pt-5 border-t border-gray-300 print:flex-col print-footer">
      <div className={`flex justify-between gap-5 ${dir}`}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <span>{t.sell_side_bar.total}:</span>
            <span>${totalPurchase || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.sell_side_bar.remaining}:</span>
            <span>${remaining}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.sell_side_bar.discount}:</span>
            <span>${discount}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.sell_side_bar.expenses}:</span>
            <span>${Expenses}</span>
          </div>
          <div className="flex justify-between pt-1 font-semibold border-t border-gray-600">
            <span>{t.sell_side_bar.totalRemaining}:</span>
            <span>${totalRemainingfunction()}</span>
          </div>
        </div>
        <QRCode value={qrData} size={120} />
      </div>
      <h1 className="mt-2 text-xs text-center">
        {t.sell_side_bar.generatedBy}
      </h1>
    </div>
  </div>
);



}
