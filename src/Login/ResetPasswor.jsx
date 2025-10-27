import { useState } from "react";
import { FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
export default function ResetPassword() {
  const [step, setStep] = useState(1); // Step 1: code, Step 2: new password
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const fakeCorrectCode = "123456"; // For demo purposes
  const navigate=useNavigate();
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === fakeCorrectCode) {
      setError("");
      setStep(2); // Move to next step
    } else {
      setError("Incorrect code, please try again!");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    alert("Password reset successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-xl rounded-3xl">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
        >
          {/* Step 1: Verification Code */}
          <div className="flex-shrink-0 flex flex-col gap-6 w-full p-10">
            <h2 className="mb-4 text-2xl font-bold text-center">Enter Code</h2>
            <p className="mb-6 text-center text-gray-600">
              Enter the verification code sent to your email.
            </p>
            <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              {error && step === 1 && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition bg-indigo-500 rounded-xl hover:bg-indigo-600"
              >
                Verify Code
              </button>
               <button
                type="button"
                onClick={()=>{navigate("/")}}
                className="w-full  py-3 font-semibold text-blue-500 transition outline-1 outline-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer "
              >
                Cancel
              </button>
            </form>
          </div>

          {/* Step 2: New Password */}
          <div className="flex-shrink-0 w-full p-10">
            <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>
            <p className="mb-6 text-center text-gray-600">
              Enter your new password below.
            </p>
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <FaLock className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-4" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-4" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              {error && step === 2 && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition bg-indigo-500 rounded-xl hover:bg-indigo-600"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={()=>{navigate("/")}}
                className="w-full  py-3 font-semibold text-blue-500 transition outline-1 outline-blue-300 rounded-xl hover:bg-blue-300 cursor-pointer "
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
