

import { 
  Home, DollarSign, UserCircle, Box, ClipboardEdit, Languages, 
  Settings, LogOut, ArrowLeft, ArrowRight, X 
} from "lucide-react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CgBoy, CgProductHunt } from "react-icons/cg";
import { FaMoneyBill } from "react-icons/fa";
import {  MdManageHistory, MdWebAsset } from "react-icons/md";

import {useLanguage} from "../../Provider/LanguageContext"
import { Moon, Sun } from "lucide-react";


const menuItems = [
  { key: "home", label: "home", icon: <Home size={18} /> },
  { key: "Production_management", label: "Production_management", icon: <MdManageHistory size={18} /> },
  { key: "sell", label: "sell", icon: <DollarSign size={18} /> },
  { key: "buy", label: "buy", icon: <BiMoneyWithdraw size={18} /> },
  { key: "suppliers", label: "suppliers", icon: <UserCircle size={18} /> },
  { key: "customer", label: "customer", icon: <CgBoy size={18} /> },
  { key: "expensive", label: "expensives", icon: <FaMoneyBill size={18} /> },
  { key: "stock", label: "stock", icon: <Box size={18} /> },
  { key: "staff", label: "staff", icon: <ClipboardEdit size={18} /> },
  { key: "Fixed_asset", label: "Fixed_asset", icon: <MdWebAsset size={18} /> },
  { key: "language", label: "language", icon: <Languages size={18} /> },
];

 export default function Sidebar({

  menuCollapsed,
  setMenuCollapsed,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  toggleBox,

}) {
  
    let {t,lang,setLang,dir,showLanguageBox,showSettingBox,active,setActive, darkmode, toggledarkmode}=useLanguage();
  
  const getMenuToggleIcon = () => {
    if (isMobile) return <X size={20} />;
    if (menuCollapsed) return lang === "eng" ? <ArrowRight size={20} /> : <ArrowLeft size={20} />;
    return lang === "eng" ? <ArrowLeft size={20} /> : <ArrowRight size={20} />;
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 z-40 transform lg:relative transition-all duration-300 ${
        
        isMobile
          ? mobileMenuOpen
            ? "translate-x-0"
            : "hidden"
          : menuCollapsed
          ? "w-16"
          : "w-64"
      } ${darkmode? " bg-gray-900 ":" bg-[#ffffff] "}lg:translate-x-0 flex flex-col shadow-2xl`}
    >
      {/* header */}
      <div className={`flex items-center justify-between p-3 font-bold text-center  ${darkmode? " text-gray-400":""}`}>
        {!menuCollapsed && <span>{t.dashboard}</span>}
        <span
          onClick={() =>
            isMobile
              ? setMobileMenuOpen(false)
              : setMenuCollapsed(!menuCollapsed)
          }
          className={`p-2 rounded-full cursor-pointer  ${darkmode? "hover:bg-blue-500":"hover:bg-blue-300"}`}
        >
          {getMenuToggleIcon()}
        </span>
      </div>

      {/* menu items */}
      <nav className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                if (item.key === "language") {
                  // setMenuCollapsed(true);
                  toggleBox("lang");
                  toggleBox("setting_not");
                }else if(item.key=='home'){
                  
                  setActive(item.key);
                }
                
                
                else{
                  setActive(item.key);

                  toggleBox("lang_not");
                  toggleBox("setting_not");
                }
              }}
              className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2  text-sm ${darkmode?"hover:bg-gray-800 ":"hover:bg-blue-200 "}  ${
                active === item.key ? darkmode? "bg-blue-700": "bg-blue-500 text-gray-400" : ""
              } ${dir}`}
            >
             <span className={`${darkmode? "text-gray-400":"text-gray-950"}`}>
              {item.icon}
              </span> 
              {!menuCollapsed && <span className={`${darkmode?"text-gray-400":"text-gray-800"}`}>{t[item.label]}</span>}
            </li>
          ))}
        </ul>

    
        {/* footer items */}
<ul className="flex flex-col gap-1 mb-4">
  <li
    onClick={() => toggledarkmode()}
    className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm   transition-colors ${
      darkmode ? "bg-gray-900 hover:bg-gray-800 text-gray-400" : "bg-whtie hover:bg-blue-500"
    } ${dir}`}
  >
    {!darkmode ? <Moon size={18} /> : <Sun size={18} className="text-gray-400" />}
    {!menuCollapsed && (
      <span>{!darkmode ? t.darkMode : t.lightMode}</span>
    )}
  </li>

  <li
    onClick={() => {
      toggleBox("setting");
    }}
    className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm hover:bg-[#365478] ${
      active === "settings" ? "bg-[#365478]" : ""
    } ${dir} ${ darkmode ? "bg-gray-900 hover:bg-gray-800 text-gray-400" : "bg-whtie hover:bg-blue-500"}`}
  >
    <Settings size={18} />
    {!menuCollapsed && <span>{t.settings}</span>}
  </li>

  <li
    onClick={() => setActive("logout")}
    className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 text-sm ${darkmode?" hover:bg-[#365478]":" hover:bg-[#365478]"} ${
      active === "logout" ? "bg-[#365478]" : ""
    } ${dir} ${ darkmode ? "bg-gray-900 hover:bg-gray-800 text-gray-400" : "bg-whtie hover:bg-blue-500"}`}
  >
    <LogOut size={18} />
    {!menuCollapsed && <span>{t.logout}</span>}
  </li>
</ul>

      </nav>

      {/* language popup */}
      {showLanguageBox && (
        <div
          className={`absolute bottom-60 ${
            lang === "eng" ? "left-16" : "right-16"
          } ${darkmode?"text-gray-400 bg-gray-800":"bg-gray-100 text-gray-800"}  rounded-xl shadow-xl p-3 w-40 transition-opacity duration-300`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li
              className={`px-2 py-1 rounded cursor-pointer ${darkmode? " hover:bg-gray-600":" hover:bg-blue-600 hover:text-white"}`}
              onClick={() => setLang("eng")}
            >
              {t.english}
            </li>
            <li
              className={`px-2 py-1 rounded cursor-pointer ${darkmode? " hover:bg-gray-600":" hover:bg-blue-600 hover:text-white"}`}
              onClick={() => setLang("fa")}
            >
              {t.dari}
            </li>
          </ul>
        </div>
      )}

      {/* settings popup */}
      {showSettingBox && (
        <div
          className={`absolute bottom-16 ${
            lang === "eng" ? "left-16" : "right-16"
          } ${darkmode?"text-gray-400 bg-gray-800":"bg-gray-100 text-gray-800"}  rounded-xl shadow-lg p-3 w-52 transition-opacity duration-300`}
        >
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:bg-[#164070] px-2 py-1 rounded cursor-pointer">
              {t.settings}
            </li>
            <li className="hover:bg-[#164070] px-2 py-1 rounded cursor-pointer">
              {t.accountSetting}
            </li>
            <li className="hover:bg-[#164070] px-2 py-1 rounded cursor-pointer">
              {t.userSetting}
            </li>
            <li className="hover:bg-[#164070] px-2 py-1 rounded cursor-pointer">
              {t.backupSetting}
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}
