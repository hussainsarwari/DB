import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import AddNewCustomerModal from "./add_new_customer";
import { useLanguage } from "../../Provider/LanguageContext";

export default function CustomerSelect({
  activePanel,
  setActivePanel,
  customers,
  setCustomers,
  selected,
  setSelected,
}) {
  const { darkmode } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const inputRef = useRef(null);

  const filtered = customers.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddCustomer = (newCustomer) => {
    if (!newCustomer?.name?.trim()) return;

    const customer = {
      id: newCustomer.id || Date.now(),
      name: newCustomer.name.trim(),
      group: newCustomer.group || "Default",
    };

    setCustomers((prev) => [...prev, customer]);
    setSelected(customer);
    setQuery(customer.name);
    setShowAddModal(false);
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    switch (e.key) {
      case "Delete":
        e.preventDefault();
        setQuery("");
        setActiveIndex(-1);
        setOpen(true);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          const value = filtered[activeIndex];
          setSelected(value);
          setQuery(value);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full mt-6">
      {/* Input */}
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-md cursor-text transition-colors
          ${darkmode ? "bg-gray-800" : "bg-white"}`}
        onClick={() => {
          inputRef.current.focus();
          setOpen(true);
        }}
      >
        <User size={22} className={darkmode ? "text-gray-400" : "text-gray-400"} />
        <input
          ref={inputRef}
          type="text"
          value={query || ""}
          placeholder="Select or search customer..."
          onClick={() => {
            setActivePanel("customer");
            setOpen(true);
          }}
          onChange={(e) => {
            setActivePanel("customer");
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={`w-full outline-none ${
            darkmode ? "text-gray-100 placeholder-gray-500 bg-gray-800" : "text-gray-800 placeholder-gray-400 bg-white"
          }`}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && activePanel === "customer" && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`absolute z-20 w-full mt-1 overflow-hidden rounded-xl shadow-lg transition-colors
              ${darkmode ? "bg-gray-800 border border-gray-700 text-gray-100" : "bg-white border border-gray-200 text-gray-800"}`}
          >
            {filtered.map((item, i) => (
              <li
                key={item}
                className={`px-5 py-2 cursor-pointer transition-colors
                  ${i === activeIndex 
                    ? darkmode ? "bg-blue-600 text-white" : "bg-blue-500 text-white" 
                    : darkmode ? "hover:bg-gray-700" : "hover:bg-blue-100"}`}
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

            {filtered.length === 0 && (
              <li
                className={`px-5 py-2 font-semibold cursor-pointer transition-colors
                  ${darkmode ? "text-blue-400 hover:bg-gray-700" : "text-blue-500 hover:bg-gray-100"}`}
                onClick={() => {
                  setShowAddModal(true);
                  setOpen(false);
                }}
              >
                + Add new customer
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Add Customer Modal */}
      {showAddModal && (
        <AddNewCustomerModal
          setShowAddModal={setShowAddModal}
          onAddCustomer={handleAddCustomer}
          defaultGroupOptions={["Retail", "Wholesale", "VIP"]}
        />
      )}
    </div>
  );
}
