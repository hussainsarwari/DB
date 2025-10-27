import React, { createContext, useContext, useState , useMemo} from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);


export const LanguageProvider = ({ children }) => {
  
  let [active, setActive] = useState("home");
  const [lang, setLang] = useState("eng");
  const [loading,setLoading]=useState(false);
    const [showLanguageBox, setShowLanguageBox] = useState(false);
    const [showSettingBox, setShowSettingBox] = useState(false);
    const [notification, setNotification] = useState(2);

  // ترجمه‌ها (به صورت ساده)
  const t = useMemo(() => ({
    eng: {
      dashboard: "Dashboard",
      home: "Home",
      Production_management:"Production Management",
      sell: "Sell",
      buy: "Buy",
      suppliers: "Suppliers",
      customer: "Customer",
      expensive: "Expensive",
      stock: "Stock",
      staff: "Staff",
      Fixed_asset: "Fixed asset",
      language: "Language",
      settings: "Settings",
      logout: "Logout",
      notifications: "Notifications",
      user: "Mohammad Hussain Sarvari",
      english: "English",
      dari: "Dari",
      accountSetting: "Account Setting",
      userSetting: "User Setting",
      backupSetting: "Backup Setting",
      search: "Search..."
    },
    fa: {
      dashboard: "دشبورد",
      home: "صفحه اصلی",
      Production_management:"مدیریت تولید",
      sell: "فروشات",
      buy: "خرید",
      suppliers: "تمویل کننده گان",
      customer: "مشتریان",
      expensive: "مصارف",
      stock: "گدام",
      staff: "کارمندان",
      Fixed_asset: "اجناس شرکت",
      language: "زبان",
      settings: "تنظیمات",
      logout: "خروج",
      notifications: "اطلاعیه‌ها",
      user: "محمد حسین سروری",
      english: "انگلیسی",
      dari: "دری",
      accountSetting: "تنظیمات حساب کاربری",
      userSetting: "تنظیمات کارمندان",
      backupSetting: "تنظیمات بک اپ",
      search: "جستجو..."
    },
  }[lang]), [lang]);
  const dir = lang === "eng" ? "flex-row" : "flex-row-reverse";

  return (
    <LanguageContext.Provider value={{active,setActive, lang, setLang, t, dir,showLanguageBox,setShowLanguageBox,showSettingBox,setShowSettingBox ,notification,setNotification,loading,setLoading}}>
      {children}
    </LanguageContext.Provider>
  );
};
