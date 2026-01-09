/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../Provider/LanguageContext";

export default function ProductSearch({
  setActivePanel,
  query,
  setQuery,
  setshowSellAmountModel,
  isOpen,
  setselectCustomerflg,
  setIsOpen,
  setopenCustomerBox,
  setSelected,
  products = []
}) {
  const { darkmode } = useLanguage();
  const inputRef = useRef(null);
  const autoSelectRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(-1);

  const [isLoading, setIsLoading] = useState(false);

  /* --------------------------------
     Helpers
  -------------------------------- */
  const isBarcode = (v) => /^\d{8,}$/.test(v);
  const isNumeric = (v) => /^\d+$/.test(v);

  const fuzzyMatch = (text, query) => {
    let t = text.toLowerCase();
    let q = query.toLowerCase();

    let ti = 0;
    for (let qi = 0; qi < q.length; qi++) {
      ti = t.indexOf(q[qi], ti);
      if (ti === -1) return false;
      ti++;
    }
    return true;
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="font-semibold text-sky-500">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  /* --------------------------------
     Default suggestions (Top 10)
  -------------------------------- */
  const defaultSuggestions = useMemo(() => products.slice(0, 10), [products]);

  /* --------------------------------
     Filtering (ID & Barcode exact match, Name fuzzy)
  -------------------------------- */
  const filtered = useMemo(() => {
    if (!query) return defaultSuggestions;

    const lower = query.toLowerCase();
    const isNum = isNumeric(query);
    const isBar = isBarcode(query);

    return products.filter((p) => {
      if (isBar && p.barcode === query) return true;
      if (isNum && String(p.id) === query) return true;
      return (
        p.name.toLowerCase().includes(lower) ||
        fuzzyMatch(p.name, query)
      );
    });
  }, [query, products, defaultSuggestions]);

  /* --------------------------------
     Relevance scoring & top 10
  -------------------------------- */
  const results = useMemo(() => {
    if (!query) return defaultSuggestions;

    const q = query.toLowerCase();

    return filtered
      .map((item) => {
        let score = 0;

        if (item.barcode === query) score += 100; // Always top
        if (String(item.id) === query) score += 90; // Always top
        if (item.name.toLowerCase() === q) score += 80;
        if (item.name.toLowerCase().startsWith(q)) score += 60;
        if (item.name.toLowerCase().includes(q)) score += 40;
        if (fuzzyMatch(item.name, query)) score += 20;

        return { ...item, _score: score };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 10);
  }, [query, filtered, defaultSuggestions]);

  const noResult = query && !isLoading && results.length === 0;

  /* --------------------------------
     Auto-select (ID/Barcode only)
  -------------------------------- */
  useEffect(() => {
    if (!query || filtered.length !== 1) return;

    const item = filtered[0];
    const exact = (isBarcode(query) && item.barcode === query) ||
                  (isNumeric(query) && String(item.id) === query);

    if (exact) {
      autoSelectRef.current = setTimeout(() => {
        setSelected(item);
        setQuery("");
        setIsOpen(false);
        setActiveIndex(-1);
        setshowSellAmountModel(true);
      }, 120);
    }

    return () => clearTimeout(autoSelectRef.current);
  }, [query, filtered, setSelected, setQuery, setIsOpen, setActiveIndex, setshowSellAmountModel]);

  /* --------------------------------
     Keyboard navigation
  -------------------------------- */
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((p) => (p < results.length - 1 ? p + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((p) => (p > 0 ? p - 1 : results.length - 1));
        break;

      case "Enter":
        if (activeIndex >= 0) {
          const item = results[activeIndex];
          setSelected(item);
          setQuery("");
          setIsOpen(false);
          setselectCustomerflg(true)
          setActiveIndex(-1);
          setshowSellAmountModel(true);
        }
        break;

      case "Delete":
        setIsOpen(false);
        setQuery("");
        setActiveIndex(-1);
        break;
      case "Escape":
        setIsOpen(false);
        setQuery("");
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  /* --------------------------------
     Global shortcut (/)
  -------------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full mx-auto mt-10">
      {/* Input */}
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-md
          ${darkmode ? "bg-gray-800" : "bg-white border border-gray-200"}`}>
        <Search size={22} className="text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          autoFocus
          placeholder="Scan barcode, enter ID or product name"
          onFocus={() => {setIsOpen(true); setopenCustomerBox(false)}}
          onChange={(e) => {
            setActivePanel("product");
            setQuery(e.target.value.trim());
            setActiveIndex(-1);
           
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent outline-none
          ${darkmode ? "text-gray-100" : "text-gray-800"}`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`absolute z-20 w-full mt-2 rounded-xl shadow-lg
              ${darkmode ? "bg-slate-800" : "bg-white border border-gray-200"}`}
          >
            {results.map((item, index) => (
              <li
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setSelected(item);
                  setQuery("");
                  setIsOpen(false);
                  setselectCustomerflg(true)
                  
                  setshowSellAmountModel(true);
                }}
                className={`px-5 py-2 text-sm cursor-pointer
                  ${index === activeIndex
                    ? "bg-sky-600 text-white"
                    : darkmode
                      ? "text-gray-200 hover:bg-slate-700"
                      : "hover:bg-gray-100"
                  }`}
              >
                {item.id}: {query ? highlightMatch(item.name, query) : item.name}
              </li>
            ))}

            {noResult && (
              <li className="px-5 py-3 text-sm text-center text-gray-400">
                نتیجه‌ای یافت نشد
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
