import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock } from "react-icons/fa";
import {auth, googleProvider, facebookProvider} from './firebase'
import {signInWithPopup} from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    if(email=="test@gmail.com" && password==123){
      navigate("/home");
    }
  };

  // google 
  const handleGoogleLogin=async ()=> {
     try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);
      navigate("/dashboard-main-page"); // redirect after success
    } catch (error) {
      console.error("Google login error:", error);
    }
  }
  // facebook
  const facebookLogin=async () => {
      try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook user:", result.user);
      navigate("/dashboard-main-page");
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen gap-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col w-full max-w-md gap-4 p-10 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute text-lg text-gray-400 -translate-y-1/2 top-1/2 left-4" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 pl-12 pr-4 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute text-lg text-gray-400 -translate-y-1/2 top-1/2 left-4" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-3 pl-12 pr-4 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-colors bg-indigo-500 shadow-md rounded-xl hover:bg-indigo-600"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-400">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-4">
          <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 py-3 transition border border-gray-300 rounded-xl hover:bg-gray-50">
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>
          <button onClick={facebookLogin} className="flex items-center justify-center gap-3 py-3 transition border border-gray-300 rounded-xl hover:bg-gray-50">
            <FaFacebookF className="text-blue-600" /> Continue with Facebook
          </button>
        </div>

        {/* Footer */}
       
      </div>
    </div>
  );
}
