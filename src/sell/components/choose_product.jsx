/* eslint-disable no-unused-vars */

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductSearch({
  setActivePanel,
  activePanel,
  query,
  setQuery,
  products,
  setSelected,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const filtered = products.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

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

  const inputRef = useRef(null);
  useEffect(() => {
    if (query) setIsOpen(true);
    else setIsOpen(false);
    const handleGlobalKeyDown = (e) => {
    // اگر داخل input یا textarea هست، کاری نکن
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
      <div className="flex items-center gap-3 px-5 py-3 bg-white shadow-md rounded-xl focus-within:shadow-lg">
        <Search className="text-gray-400" size={22} />
        <input
          type="text"
            ref={inputRef}
              onClick={()=>{setActivePanel("product");
                setIsOpen(true);
              }}
          placeholder="press / to search  product name or ID"
          value={query}
          onChange={(e) => {
            setActivePanel("product");
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full text-base text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      <AnimatePresence>
        {isOpen && activePanel === "product" && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-20 w-full mt-2 overflow-hidden bg-white shadow-lg rounded-xl"
          >
            {filtered.map((item, index) => (
              <li
                key={item}
                className={`px-5 py-2 cursor-pointer transition-colors
                  ${
                    index === activeIndex
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 hover:bg-blue-100"
                  }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setSelected(item);
                  setQuery("");
                  setIsOpen(false);
                  setActiveIndex(-1);
                }}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
