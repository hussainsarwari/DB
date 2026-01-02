import {
  Home,
  DollarSign,
  UserCircle,
  Box,
  ClipboardEdit,
  Languages,
  Settings,
  LogOut,
  X,
  Moon,
  Sun,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CgBoy } from "react-icons/cg";
import { FaMoneyBill } from "react-icons/fa";
import { MdManageHistory, MdWebAsset } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Provider/LanguageContext";
import { useState } from "react";

const menuItems = [
  { key: "home", label: "home", icon: <Home size={18} /> },
  {
    key: "Production_management",
    label: "Production_management",
    icon: <MdManageHistory size={18} />,
  },
  { key: "sell", label: "sell", icon: <DollarSign size={18} /> },
  { key: "buy", label: "buy", icon: <BiMoneyWithdraw size={18} /> },
  { key: "suppliers", label: "suppliers", icon: <UserCircle size={18} /> },
  { key: "customer", label: "customer", icon: <CgBoy size={18} /> },
  { key: "expensive", label: "expensives", icon: <FaMoneyBill size={18} /> },
  { key: "stock", label: "stock", icon: <Box size={18} /> },
  { key: "staff", label: "staff", icon: <ClipboardEdit size={18} /> },
  { key: "Fixed_asset", label: "Fixed_asset", icon: <MdWebAsset size={18} /> },
  {
    key: "language",
    label: "language",
    icon: <Languages size={18} />,
    noLink: true,
  },
];

export default function Sidebar() {
  const {
    t,
    lang,
    setLang,
    dir,
    mobileMenuOpen, setMobileMenuOpen,
    menuCollapsed,
    setMenuCollapsed,
    active,
    setActive,
    darkmode,
    toggledarkmode,
    isMobile,
  } = useLanguage();

  const [showLanguageBox, setShowLanguageBox] = useState(false);
  const [showSettingBox, setShowSettingBox] = useState(false);


  const getMenuToggleIcon = () => {
    if (isMobile) return mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />;
    if (menuCollapsed) return <MenuIcon size={20} />;
    return <XIcon size={20} />;
  };

  return (
    <aside
      className={`
        fixed top-0 bottom-0 z-40 flex flex-col transition-all duration-300 
        lg:relative
        ${darkmode ? "bg-gray-900" : "bg-white"}

        ${isMobile ? (mobileMenuOpen ? "translate-x-0" : lang=="eng"?"-translate-x-full":"translate-x-full") : ""}
        ${!isMobile ? (menuCollapsed ? "w-16" : "w-60") : ""}
        ${isMobile ? "w-64" : ""}
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center border-b mb-1 border-[#b4b4b4] justify-between p-3 font-bold  
          ${darkmode ? "text-gray-400" : ""}  
          ${dir}`}
      >
        {!menuCollapsed && <span>{t.dashboard}</span>}

        <button
          type="button"
          onClick={() => {
            console.log(123)
            isMobile
              ? setMobileMenuOpen(!mobileMenuOpen)  
              : setMenuCollapsed(!menuCollapsed);
          }}
          className="p-2 rounded-full cursor-pointer"
        >
          {getMenuToggleIcon()}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`flex items-center gap-3 rounded px-3 py-2 text-sm 
                ${darkmode ? "hover:bg-gray-800" : "hover:bg-blue-200"}
                ${active === item.key && "bg-sky-500 text-white"}
              `}
            >
              {!item.noLink ? (
                <Link
                  to={`/${item.key}`}
                  className={`flex items-center w-full gap-3 ${menuCollapsed && "justify-center"} ${dir}`}
                  onClick={() => {
                    setActive(item.key);
                    setShowLanguageBox(false);
                    setShowSettingBox(false);
                    if (isMobile) setMobileMenuOpen(false);
                  }}
                >
                  <span
                    className={`${darkmode ? "text-gray-400" : "text-gray-950"} ${
                      active === item.key ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!menuCollapsed && (
                    <span
                      className={`${darkmode ? "text-gray-400" : "text-gray-800"} ${
                        active === item.key ? "text-white" : ""
                      }`}
                    >
                      {t[item.label]}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`flex items-center w-full gap-3 ${
                    menuCollapsed && "justify-center"
                  } cursor-pointer ${dir}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLanguageBox(!showLanguageBox);
                    setShowSettingBox(false);
                  }}
                >
                  <span className={darkmode ? "text-gray-400" : "text-gray-950"}>
                    {item.icon}
                  </span>
                  {!menuCollapsed && (
                    <span className={darkmode ? "text-gray-400" : "text-gray-800"}>
                      {t[item.label]}
                    </span>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <ul className="flex flex-col gap-1 mb-4 border-t border-[#b6b6b6]">
          <li
            onClick={() => {
              toggledarkmode();
              setShowLanguageBox(false);
              setShowSettingBox(false);
            }}
            className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm 
              ${menuCollapsed && "justify-center"}
              ${
                darkmode
                  ? "bg-gray-900 hover:bg-gray-800 text-gray-400"
                  : "bg-white hover:bg-blue-500 text-gray-800"
              } ${dir}`}
          >
            {darkmode ? <Sun size={18} /> : <Moon size={18} />}
            {!menuCollapsed && <span>{darkmode ? t.lightMode : t.darkMode}</span>}
          </li>

          <li
            onClick={() => {
              setShowSettingBox(!showSettingBox);
              setShowLanguageBox(false);
            }}
            className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm 
              ${menuCollapsed && "justify-center"}
              ${
                darkmode
                  ? "bg-gray-900 hover:bg-gray-800 text-gray-400"
                  : "bg-white hover:bg-blue-500 text-gray-800"
              } ${dir}`}
          >
            <Settings size={18} />
            {!menuCollapsed && <span>{t.settings}</span>}
          </li>

          <li
            onClick={() => {
              setActive("logout");
              setShowLanguageBox(false);
              setShowSettingBox(false);
            }}
            className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm 
              ${menuCollapsed && "justify-center"}
              ${
                darkmode
                  ? "bg-gray-900 hover:bg-gray-800 text-gray-400"
                  : "bg-white hover:bg-blue-500 text-gray-800"
              } ${dir}`}
          >
            <LogOut size={18} />
            {!menuCollapsed && <span>{t.logout}</span>}
          </li>
        </ul>
      </nav>

      {/* Language Popup */}
      {showLanguageBox && (
        <div
          className={`absolute bottom-34 ${lang === "eng" ? "left-1" : "right-1"}
            ${darkmode ? "text-gray-400 bg-gray-800" : "bg-gray-100 text-gray-800"}
            rounded-xl shadow-xl p-3 w-40`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li
              className={`px-2 py-1 rounded cursor-pointer ${
                darkmode ? "hover:bg-gray-600" : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setLang("eng")}
            >
              {t.english}
            </li>
            <li
              className={`px-2 py-1 rounded cursor-pointer ${
                darkmode ? "hover:bg-gray-600" : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setLang("fa")}
            >
              {t.dari}
            </li>
          </ul>
        </div>
      )}

      {/* Settings Popup */}
      {showSettingBox && (
        <div
          className={`absolute bottom-10 ${lang === "eng" ? "left-16" : "right-16"}
            ${darkmode ? "text-gray-400 bg-gray-800" : "bg-gray-100 text-gray-800"}
            rounded-xl shadow-lg p-3 w-52`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li className="px-2 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-white">
              {t.settings}
            </li>
            <li className="px-2 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-white">
              {t.accountSetting}
            </li>
            <li className="px-2 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-white">
              {t.userSetting}
            </li>
            <li className="px-2 py-1 rounded cursor-pointer hover:bg-blue-700 hover:text-white">
              {t.backupSetting}
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}
