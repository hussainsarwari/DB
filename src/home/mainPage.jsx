import { useEffect ,useState} from "react";
import {
  ArrowLeft,
  ArrowRight,
  MenuIcon,
  BellIcon,
  User,
  MessageSquare,
  X,
} from "lucide-react";
import Sidebar from "../component/sidebar/sidebar";
import HomePage from "./home_page";
import { useLanguage } from "../Provider/LanguageContext";
import Header from "../component/header/header";
import Loading from '../component/loading/react_loader_spinner'

export default function DashboardMainPage() {
  const { dir, darkmode, setMobileMenuOpen, mobileMenuOpen, setIsMobile } =
    useLanguage();

      // State to handle loading
      const [loading, setLoading] = useState(true);
    
      // Simulate loading for 1.5 seconds
      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
      }, []);

  // مدیریت تغییر سایز صفحه
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div
      className={`flex h-screen ${
        darkmode ? "bg-gray-900" : "bg-gray-100"
      }  ${dir}`}
    >
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-30 ${
            darkmode ? "bg-gray-300/40" : "bg-black/40"
          }  lg:hidden`}
          onClick={() => setMobileMenuOpen(false)}
        >
          
        </div>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}

        <main className="flex-1 overflow-y-auto">
          {/* ✅ Header Component */}
          <Header />





            {/* Loader */}
                    {loading && (
                      <div className={`absolute inset-0 z-50 flex items-center justify-center  ${darkmode?"bg-gray-800/70":"bg-gray-100/70"}`}>
                        <Loading />
                      </div>
                    )}
          
                    {/* Your actual page content goes here */}
                    {!loading && (
                     
                      
                      <HomePage />
                    )}
        </main>
      </div>
    </div>
  );
}
