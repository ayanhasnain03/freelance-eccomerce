import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiUpload } from "react-icons/fi";
import { useRegisterUserMutation, useLoginUserMutation } from "../../redux/api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userExist } from "../../redux/reducers/userReducer";
import toast from "react-hot-toast";

const AuthTabs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [avatar, setAvatar] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
     const response = await registerUser(formData).unwrap();
      dispatch(userExist(response.user));
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password }).unwrap();
      navigate("/profile");
dispatch(userExist(response.user));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleTabChange(0)}
            className={`${
              activeTab === 0
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            } pb-2 text-xl font-semibold`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`${
              activeTab === 1
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            } pb-2 text-xl font-semibold`}
          >
            Register
          </button>
        </div>

        {activeTab === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">

            </div>
            <form onSubmit={loginHandler} className="space-y-4 mt-20">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-[22%] transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <p className="text-right text-sm mt-4">
        <Link to="/forgot-password" className="text-blue-500">
          Forgot Password?
        </Link>
                </p>

              </div>


              <motion.button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </motion.button>


         <div className="text-center mt-6">
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleTabChange(1)}
                >
                  Register
                </span>
              </p>
            </div>


            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <div className="relative">
                <motion.img
                  src={avatar ? URL.createObjectURL(avatar) : "register.png"}
                  alt="Profile"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                >
                  <FiUpload className="w-5 h-5" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

            </div>

            <form onSubmit={registerHandler} className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Gender Select */}
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                disabled={isRegistering}
              >
                {isRegistering ? "Registering..." : "Register"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthTabs;
