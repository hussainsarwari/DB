/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../Provider/LanguageContext";

export default function ProductSearch({
  setActivePanel,
  activePanel,
  query,
  setQuery,
  setshowSellAmountModel,
  setSelected,
  products
}) {



  
  const { darkmode } = useLanguage();
  const inputRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  // جستجوی هوشمند بر اساس نام، ID یا بارکد
  const getFiltered = () => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.id.includes(query) ||
      (p.barcode && p.barcode.includes(query))
    );
  };

  const filtered = getFiltered();
  

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          const item = filtered[activeIndex];
          setSelected(item);
          setQuery("");
          setIsOpen(false);
          setActiveIndex(-1);
          setshowSellAmountModel(true);
        }
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

  useEffect(() => {
    if (query) setIsOpen(true);
    else setIsOpen(false);

    const handleGlobalKeyDown = (e) => {
      const tag = document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [query]);

  return (
    <div className="relative w-full mx-auto mt-10">
      {/* Search Input */}
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-md focus-within:shadow-md transition
        ${darkmode ? "bg-gray-800 " : "bg-white border border-gray-200"}`}
      >
        <Search size={22} className={darkmode ? "text-gray-400" : "text-gray-400"} />

        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name, ID or barcode"
          value={query}
          onClick={() => {
            setActivePanel("product");
            setIsOpen(true);
          }}
          onChange={(e) => {
            setActivePanel("product");
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className={`w-full text-base bg-transparent outline-none
            ${darkmode
              ? "text-gray-100 placeholder-gray-400"
              : "text-gray-800 placeholder-gray-400"
            }`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && activePanel === "product" && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`absolute z-20 w-full mt-2 overflow-hidden rounded-xl shadow-lg
            ${darkmode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}
          >
            {filtered.map((item, index) => (
              <li
                key={item.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setshowSellAmountModel(true);
                  setSelected(item);
                  setQuery("");
                  setIsOpen(false);
                  setActiveIndex(-1);
                }}
                className={`px-5 py-2 cursor-pointer text-sm transition-colors
                ${
                  index === activeIndex
                    ? darkmode
                      ? "bg-slate-600 text-white"
                      : "bg-gray-200 text-gray-900"
                    : darkmode
                      ? "text-gray-200 hover:bg-slate-700"
                      : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.name} - ID: {item.id} - Barcode: {item.barcode}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
