// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useMemo , useEffect} from "react";
import { translations } from "./dictionary";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [darkmode,setdarkmode]=useState(
     localStorage.getItem("darkmode") || false
  );
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("eng");
  const [loading, setLoading] = useState(false);
  const [showLanguageBox, setShowLanguageBox] = useState(false);
  const [showSettingBox, setShowSettingBox] = useState(false);
  const [notification, setNotification] = useState(2);

  // انتخاب ترجمه از فایل جداگانه
  const t = useMemo(() => translations[lang], [lang]);
  const dir = lang === "eng" ? "flex-row" : "flex-row-reverse";






   // تغییر کلاس HTML برای Tailwind
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkmode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode]);

  const toggledarkmode = () => {
    setdarkmode((prev) => (prev ? false : true));
  };

  return (
    <LanguageContext.Provider
      value={{
        active,
        setActive,
        lang,
        setLang,
        t,
        dir,
        showLanguageBox,
        setShowLanguageBox,
        showSettingBox,
        setShowSettingBox,
        notification,
        setNotification,
        loading,
        setLoading,
        darkmode,
        setdarkmode,
        toggledarkmode
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
