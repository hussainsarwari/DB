import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import AddNewCustomerModal from "./add_new_customer";

export default function CustomerSelect({
  activePanel,
  setActivePanel,
  customers,
  setCustomers,
  selected,
  setSelected,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const inputRef = useRef(null);

  const filtered = customers.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

// افزودن مشتری جدید – نسخه اصلاح‌شده
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
          className="w-full text-gray-800 outline-none"
        />
      </div>

      <AnimatePresence>
        {open && activePanel === "customer" && (
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

            {filtered.length === 0 && (
              <li
                className="px-5 py-2 font-semibold text-blue-400 cursor-pointer hover:bg-gray-100 "
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
