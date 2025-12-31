import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from './Login/ResetPasswor'
import Home from './home/mainPage'
import Production_management from './production_management/main_page'
import SellPage from './sell/main'
import Staff from "./staff/Staff";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Production_management" element={<Production_management />} />
      <Route path="/sell" element={<SellPage />} />
      <Route path="/staff" element={<Staff />} />

    </Routes>
  );
}
