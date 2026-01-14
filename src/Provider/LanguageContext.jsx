import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { translations } from "./dictionary";
import { sellHistoryTranslations } from "./sellHistory&SellReturned/dictionary";

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // 🌓 Darkmode
  const [darkmode, setdarkmode] = useState(() => {
    const stored = localStorage.getItem("darkmode");
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 🌐 Language
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "fa");

  // 📍 Active page
  const [active, setActive] = useState(() => sessionStorage.getItem("active") || "home");

  // 🧠 Translations & Direction
  const t = useMemo(() => translations[lang], [lang]);
  const SellPageHistory = useMemo(() => sellHistoryTranslations[lang], [lang]);
  const dir = lang === "eng" ? "flex-row" : " flex-row-reverse";

  // 🧩 Auto-save states
  useEffect(() => {
    if (active) sessionStorage.setItem("active", active);
  }, [active]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    darkmode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("darkmode", darkmode);
  }, [darkmode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🧭 Toggle helpers
  const toggledarkmode = () => setdarkmode((prev) => !prev);

  return (
    <LanguageContext.Provider
      value={{
        active, setActive,
        lang, setLang,
        SellPageHistory,
        t, dir,
        mobileMenuOpen, setMobileMenuOpen,
        menuCollapsed,setMenuCollapsed,
        loading, setLoading,
        darkmode, setdarkmode, toggledarkmode,
        isMobile, setIsMobile,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
