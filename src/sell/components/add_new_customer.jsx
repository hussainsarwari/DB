import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Users, FileText, X } from "lucide-react";
import Swal from "sweetalert2";

export default function AddNewCustomerModal({
  setShowAddModal,
  onAddCustomer,
  defaultGroupOptions = [],
}) {
  const [customer, setCustomer] = useState({
    name: "",
    lastname: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    group: "",
    notes: "",
  });

  const refs = {
    name: useRef(null),
    lastname: useRef(null),
    phone: useRef(null),
    whatsapp: useRef(null),
    email: useRef(null),
    address: useRef(null),
    group: useRef(null),
    notes: useRef(null),
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const handleAdd = () => {
    if (
      !customer.name.trim() ||
      !customer.lastname.trim() ||
      !customer.phone.trim() ||
      !customer.group.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Customer name, last name, phone, and group are required.",
      });
      return;
    }

    const payload = {
      ...customer,
      group: customer.group || "Default",
    };

    onAddCustomer(payload);

    setCustomer({
      name: "",
      lastname: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
      group: "",
      notes: "",
    });

    setShowAddModal(false);
  };

  const Field = ({ icon: Icon, children }) => (
    <div className="relative mb-3">
      <Icon className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
      {children}
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col w-full max-w-[350px] max-w-md gap-3 p-6 bg-white shadow-xl rounded-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Add New Customer</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-1 text-gray-400 rounded hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Field icon={User}>
            <input
              ref={refs.name}
              name="name"
              value={customer.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.lastname)}
              placeholder="Customer name *"
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={User}>
            <input
              ref={refs.lastname}
              name="lastname"
              value={customer.lastname}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.phone)}
              placeholder="Last name *"
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={Phone}>
            <input
              ref={refs.phone}
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.whatsapp)}
              placeholder="Phone number"
              type="tel"
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={Phone}>
            <input
              ref={refs.whatsapp}
              name="whatsapp"
              value={customer.whatsapp}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.email)}
              placeholder="WhatsApp number"
              type="tel"
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={Mail}>
            <input
              ref={refs.email}
              name="email"
              value={customer.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.address)}
              placeholder="Email address"
              type="email"
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={MapPin}>
            <textarea
              ref={refs.address}
              name="address"
              value={customer.address}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.group)}
              placeholder="Address"
              rows={2}
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field icon={Users}>
            <select
              ref={refs.group}
              name="group"
              value={customer.group}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, refs.notes)}
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select group</option>
              {defaultGroupOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>

          <Field icon={FileText}>
            <textarea
              ref={refs.notes}
              name="notes"
              value={customer.notes}
              onChange={handleChange}
              placeholder="Internal notes"
              rows={2}
              className="w-full py-3 pl-10 pr-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Customer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
