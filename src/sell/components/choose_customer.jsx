import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

export default function CustomerSelect({
  activePanel,
  setActivePanel,
  customers,
  selected,
  setSelected,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);

  const filtered = customers.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

 

  const handleKeyDown = (e) => {
     if (e.key === "Delete") {
    e.preventDefault();
    setQuery("");
    setActiveIndex(-1);
    setOpen(true); 
    return;
  }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        i <= 0 ? filtered.length - 1 : i - 1
      );
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const value = filtered[activeIndex];
      setSelected(value);
      setQuery(value);
      setOpen(false);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full mt-6">
      <div
        className="flex items-center gap-3 px-5 py-3 bg-white shadow-md rounded-xl cursor-text"
        onClick={() => {
          inputRef.current.focus();
          setOpen(true);
        }}
      >
        <User size={22} className="text-gray-400" />

        <input
          ref={inputRef}
          type="text"
          value={query|| ""}
          onClick={()=>{setActivePanel("customer"); setOpen(true)}}
          placeholder="Select or search customer..."
          onChange={(e) => {
            setActivePanel("customer");
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full text-gray-800 outline-none"
        />
      </div>

      <AnimatePresence>
        {open && filtered.length > 0 && activePanel === "customer" && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-20 w-full mt-1 overflow-hidden bg-white shadow-lg rounded-xl"
          >
            {filtered.map((item, i) => (
              <li
                key={item}
                className={`px-5 py-2 cursor-pointer ${
                  i === activeIndex
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  setSelected(item);
                  setQuery(item);
                  setOpen(false);
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
