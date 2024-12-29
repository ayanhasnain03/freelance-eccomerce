import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiUpload, FiPhone } from "react-icons/fi";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../../redux/api/userApi";
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
  const [phoneNo, setPhoneNo] = useState("");

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
    formData.append("phoneNo", phoneNo);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await registerUser(formData).unwrap();
      dispatch(userExist(response.user));
      toast.success("Registration successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Error during registration:", error);
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      navigate("/profile");
      dispatch(userExist(response.user));
      toast.success(response?.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 ">
      <motion.div
        className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleTabChange(0)}
            className={`${
              activeTab === 0
                ? "border-b-2 border-primary-red text-primary-red"
                : "text-gray-500"
            } pb-2 text-xl font-semibold transition-colors duration-300`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`${
              activeTab === 1
                ? "border-b-2 border-primary-red text-primary-red"
                : "text-gray-500"
            } pb-2 text-xl font-semibold transition-colors duration-300`}
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
            <section className="bg-gray-50 flex justify-center items-center">
              <div className="bg-white rounded-2xl flex max-w-4xl md:w-full md:p-8">
                <div className="md:w-1/2 w-full flex flex-col justify-center px-8">
                  <h2 className="font-bold text-3xl text-primary-red font-agu mb-4">
                    Login
                  </h2>
                  <p className="text-base md:text-2xl text-gray-600 font-dancing mb-6">
                    If you are already a member, easily log in now.
                  </p>

                  <form
                    onSubmit={loginHandler}
                    className="flex flex-col gap-5"
                  >
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent transition duration-300"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent transition duration-300"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Link to="/forgot-password" className="bg-white text-left text-sm text-gray-600 duration-300 hover:underline font-inter">
                      Forgot Password?
                    </Link>

                    <button
                      className="hover:bg-rose-600 text-white py-2 rounded-xl transition duration-300 bg-primary-red font-inter mt-6"
                      type="submit"
                    >
                      {isLoggingIn ? "Loading..." : "Login"}
                    </button>
                  </form>

                  <div className="mt-6 flex items-center text-gray-600">
                    <hr className="border-gray-300 flex-grow" />
                    <p className="text-sm mx-4">OR</p>
                    <hr className="border-gray-300 flex-grow" />
                  </div>

                  <div className="text-sm flex flex-col gap-4 justify-between items-center mt-6">
                    <p className="mr-3">Don't have an account?</p>
                    <button
                      onClick={() => handleTabChange(1)}
                      className="border border-primary-red text-primary-red hover:bg-primary-red hover:text-white rounded-xl py-2 px-12 flex justify-center items-center text-sm transition-all duration-300 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="md:block hidden w-1/2">
                  <img
                    className="rounded-2xl w-[400px] h-[400px] object-cover"
                    src="loginmodel.webp"
                    alt="login form image"
                  />
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center w-full">
              <motion.div
                className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-6">
                  <h2 className="font-bold text-3xl text-primary-red font-agu">
                    Register
                  </h2>
                  <p className="text-2xl mt-4 text-gray-600 font-dancing">
                    Create an account and join us now!
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <section className="bg-gray-50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl flex max-w-4xl md:w-full md:p-8">
                      <div className="md:w-1/2 w-full flex flex-col justify-center px-8">
                        <form onSubmit={registerHandler} className="space-y-4">
                          <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                              type="text"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                              required
                            />
                          </div>

                          <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                              required
                            />
                          </div>

                          <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                              required
                            />
                          </div>

                          <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                              type="number"
                              placeholder="Phone Number"
                              value={phoneNo}
                              onChange={(e) => setPhoneNo(e.target.value)}
                              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                              required
                            />
                          </div>

                          <div className="relative">
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                              required
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="relative">
                            <div className="flex justify-center mb-4">
                              <motion.img
                                src={
                                  avatar
                                    ? URL.createObjectURL(avatar)
                                    : "register.png"
                                }
                                alt="Profile"
                                className="mx-auto rounded-full w-32 h-32 object-cover"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <label
                              htmlFor="imageUpload"
                              className="absolute bottom-0 z-20 right-0 bg-primary-red text-white p-2 rounded-full cursor-pointer"
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

                          <motion.button
                            type="submit"
                            className="w-full p-3 bg-primary-red text-white rounded-md hover:bg-rose-600 "
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            
                          >
                            {isRegistering ? "Registering..." : "Register"}
                          </motion.button>
                        </form>

                        <div className="mt-6 flex items-center text-gray-600">
                          <hr className="border-gray-300 flex-grow" />
                          <p className="text-sm mx-4">OR</p>
                          <hr className="border-gray-300 flex-grow" />
                        </div>

                        <div className="mt-6 text-center mx-auto">
                          <p className="text-sm">Already have an account?</p>
                          <button
                            className="border mt-4 border-primary-red text-primary-red hover:bg-primary-red hover:text-white rounded-xl py-2 px-12 flex justify-center items-center text-sm transition-all duration-300 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                            onClick={() => handleTabChange(0)}
                          >
                            Login
                          </button>
                        </div>
                      </div>

                      <div className="md:block hidden w-1/2">
                        <img
                          className="rounded-2xl w-[400px] h-[400px] object-cover"
                          src="loginmodel.webp"
                          alt="register form image"
                        />
                      </div>
                    </div>
                  </section>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthTabs;