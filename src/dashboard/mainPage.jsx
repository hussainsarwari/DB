import { useState, useEffect } from "react";
import { 
  ArrowLeft, ArrowRight, MenuIcon, BellIcon, User, MessageSquare, X 
} from "lucide-react";
import Sidebar from "./components/sidebar";
import HomePage from "./components/home_page";
import {useLanguage} from "../LanguageContext"

// دیکشنری زبان


export default function DashboardMainPage() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const {t,dir,showLanguageBox,showSettingBox,setShowLanguageBox,setShowSettingBox,notification,active}=useLanguage();

 

  // مدیریت تغییر سایز صفحه
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // toggle helper
  const toggleBox = (box) => {
   if (box === "lang") {
  setShowLanguageBox(!showLanguageBox);
} else if (box === "lang_not") {
  setShowLanguageBox(false);
}
   else if(box=='setting')
    {

      setShowSettingBox(box === "setting" ? !showSettingBox : false);
     
     
    }
    else if (box=="setting_not"){
      setShowSettingBox(box === "setting_not" ?   false: !showSettingBox);
      
    }
    
    else if(box=="notif"){

      setShowNotifications(box === "notif" ? !showNotifications : false);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${dir}`}>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
   
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        toggleBox={toggleBox}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        

        <main className="flex-1 overflow-y-auto">
           <header className="sticky top-0 z-20 flex items-center justify-between w-full px-4 bg-white shadow h-14">
          <div className="flex items-center flex-1 gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full lg:hidden hover:bg-gray-200"
            >
              <MenuIcon size={20} />
            </button>
            <input
              type="search"
              placeholder={t.search}
              className="flex-1 px-3 py-1 text-sm rounded-2xl sm:max-w-xs outline-0"
            />
          </div>

          <div className={`flex ${dir} items-center gap-3 relative`}>
            <div
              onClick={() => toggleBox("notif")}
              className="relative p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100"
            >
              <BellIcon size={20} />
              {notification > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] bg-blue-400 text-white rounded-full">
                  {notification}
                </span>
              )}
            </div>

            {showNotifications && (
              <div className="absolute right-0 w-64 p-3 transition-opacity duration-300 bg-white shadow-lg top-14 rounded-xl">
                <h1 className="mb-2 text-sm text-center">{t.notifications}</h1>
                <ul>
                  <li className="flex items-center justify-between px-3 py-2 text-xs bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200">
                    {t.settings} <MessageSquare size={14} color="blue" />
                  </li>
                </ul>
              </div>
            )}

            <div className="p-2 bg-white rounded-full cursor-pointer hover:bg-gray-100">
              <User size={20} />
            </div>
            <span className="hidden text-sm sm:inline">{t.user}</span>
          </div>
        </header>
   
    {/* body  */}
    <div className="">
   {(active ==="home") && <HomePage/>}
    </div>
        </main>
      </div>
    </div>
  );
}
