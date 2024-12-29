import { useState } from "react";
import { Link } from "react-router-dom";
import { useForegetPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [createForgot, { isLoading }] = useForegetPasswordMutation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Password reset link sent to ${email}`);
    try {
      const res = await createForgot({ email }).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email address, and we'll send you a link to reset your password.
        </p>

        {message && <div className="text-center text-green-600 mb-4">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              disabled={isLoading} 
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-[#1DA1F2]"
            } text-white p-3 rounded-md hover:bg-[#1A91DA] transition duration-300`}
            disabled={isLoading} 
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/auth" className="text-blue-600 hover:underline">
            Remember your password? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
