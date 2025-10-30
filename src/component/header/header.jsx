import { MenuIcon, BellIcon, MessageSquare, User } from "lucide-react";
import { useLanguage } from "../../Provider/LanguageContext";

export default function Header() {
   const {
    dir,
    darkmode,
    setMobileMenuOpen,
    t,
    toggleBox,
    notification,
    showNotifications,
  } = useLanguage();

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between w-full px-4 shadow-2xl h-14 ${
        darkmode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Left section */}
      <div className="flex items-center flex-1 gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`p-2 rounded-full lg:hidden ${
            darkmode ? "text-gray-100" : "hover:bg-gray-200"
          }`}
        >
          <MenuIcon size={20} />
        </button>

        <input
          type="search"
          placeholder={t.search}
          className={`flex-1 px-3 py-1 text-sm rounded-2xl sm:max-w-xs outline-0 ${
            darkmode
              ? "text-gray-400 bg-gray-800 placeholder-gray-500"
              : "text-gray-900 bg-gray-100 placeholder-gray-500"
          }`}
        />
      </div>

      {/* Right section */}
      <div className={`flex ${dir} items-center gap-3 relative`}>
        {/* Notification Bell */}
        <div
          onClick={() => toggleBox("notif")}
          className={`relative p-2 rounded-full cursor-pointer ${
            darkmode
              ? "hover:bg-gray-800 bg-gray-900 text-gray-400"
              : "hover:bg-gray-100 bg-white"
          }`}
        >
          <BellIcon size={20} />
          {notification > 0 && (
            <span
              className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] rounded-full ${
                darkmode
                  ? "bg-gray-400 text-gray-100"
                  : "bg-blue-400 text-gray-100"
              }`}
            >
              {notification}
            </span>
          )}
        </div>

        {/* Notification Popup */}
        {showNotifications && (
          <div
            className={`absolute overflow-auto flex flex-col gap-1 right-0 w-64 p-3 transition-opacity duration-300 ${
              darkmode ? "bg-gray-900 text-gray-400" : "bg-white"
            } h-[300px] shadow-xl top-14 rounded-xl`}
          >
            <h1 className="mb-2 text-sm text-center">{t.notifications}</h1>
            <ul className="flex flex-col gap-3">
              <li
                className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg cursor-pointer ${
                  darkmode
                    ? "bg-gray-950 hover:bg-gray-800"
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                {t.settings}
                <MessageSquare
                  size={14}
                  color={darkmode ? "white" : "blue"}
                />
              </li>
            </ul>
          </div>
        )}

        {/* User Section */}
        <div
          className={`p-2 rounded-full cursor-pointer ${
            darkmode
              ? "hover:bg-gray-800 bg-gray-900 text-gray-400"
              : "hover:bg-gray-100 bg-white"
          }`}
        >
          <User size={20} />
        </div>

        <span
          className={`hidden text-sm sm:inline ${
            darkmode ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {t.user}
        </span>
      </div>
    </header>
  );
}
