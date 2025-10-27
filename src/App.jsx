import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from './Login/ResetPasswor'
import DashboadMainPage from './home/mainPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Reset-password" element={<ResetPassword/>}/>
      <Route path="/dashboard-main-page" element={<DashboadMainPage />}/>

    </Routes>
  );
}
