// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { translations } from "./dictionary";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [active, setActive] = useState("home");
  const [lang, setLang] = useState("eng");
  const [loading, setLoading] = useState(false);
  const [showLanguageBox, setShowLanguageBox] = useState(false);
  const [showSettingBox, setShowSettingBox] = useState(false);
  const [notification, setNotification] = useState(2);

  // انتخاب ترجمه از فایل جداگانه
  const t = useMemo(() => translations[lang], [lang]);
  const dir = lang === "eng" ? "flex-row" : "flex-row-reverse";

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
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
