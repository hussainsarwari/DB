import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example condition: email is not empty and contains "@"
    if (email && email.includes("@")) {
      // TODO: send API request to trigger reset email
     

      // Redirect to the reset password page
      navigate("/reset-password"); // Change the route as needed
    } else {
      alert("Please enter a valid email!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col w-full max-w-md gap-5 p-10 bg-white shadow-xl rounded-3xl">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter your email below and we’ll send you a link to reset your password.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute text-lg text-gray-400 -translate-y-1/2 top-1/2 left-4" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 pl-12 pr-4 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition bg-indigo-500 shadow-md rounded-xl hover:bg-indigo-600"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Remember your password?{" "}
          <Link to="/" className="font-medium text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
