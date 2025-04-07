import { motion } from "framer-motion";
import moment from "moment";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader/Loader";
import { useGetMyOrdersQuery } from "../../redux/api/orderApi";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import { userNotExist } from "../../redux/reducers/userReducer";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.user);
  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();
  const { data } = useGetMyOrdersQuery({ limit: 5 });
  const dispatch = useDispatch();

  if (!user?._id) {
    dispatch(userNotExist());
    navigate("/login");
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-100 flex justify-center items-center p-6"
        >
          <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="md:w-1/3 bg-gradient-to-br from-gray-200 to-gray-300 p-8 flex flex-col items-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                  <img
                    src={
                      user?.avatar[0]?.url || "https://via.placeholder.com/150"
                    }
                    alt="Profile Picture"
                    className="relative w-40 h-40 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <h2 className="mt-6 text-3xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="mt-2 text-gray-600">{user?.email}</p>
                <p className="mt-1 text-sm text-gray-500 italic">
                  Member since {moment(user?.createdAt).format("MMMM YYYY")}
                </p>
                <div className="mt-6 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      //@ts-ignore
                      await logoutUser().unwrap();
                      toast.success("Logged out successfully");
                      dispatch(userNotExist());
                    }}
                    disabled={logoutLoading}
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Logout
                  </motion.button>
                </div>
              </motion.div>
              {/* Main Content */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="md:w-2/3 p-8"
              >
                {/* Account Details */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Account Details
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded transition">
                      <span className="font-medium text-gray-700">
                        Full Name:
                      </span>
                      <span className="text-gray-600">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded transition">
                      <span className="font-medium text-gray-700">
                        Email Address:
                      </span>
                      <span className="text-gray-600">{user?.email}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded transition">
                      <span className="font-medium text-gray-700">
                        Phone Number:
                      </span>
                      <span className="text-gray-600">+91 {user?.phoneNo}</span>
                    </div>
                  </div>
                </motion.div>
                {/* Recent Orders */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Recent Orders
                  </h3>
                  <div className="mt-4 space-y-4">
                    {data?.orders?.length > 0 ? (
                      data.orders.map((order, index) => (
                        <Link to={`/order/${order._id}`} key={index}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition duration-300"
                          >
                            <div>
                              <p className="font-medium text-gray-800">
                                Order #{order.orderId}
                              </p>
                              <p className="text-sm text-gray-600">
                                Status:{" "}
                                <span className="text-green-600 font-medium">
                                  {order.status}
                                </span>
                              </p>
                            </div>
                            <div className="text-lg font-medium text-gray-800">
                              ₹{order.total}
                            </div>
                          </motion.div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-600">No recent orders found.</p>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/myorders">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-red-600 font-medium hover:text-red-700 transition"
                      >
                        View All Orders →
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
                {/* Edit Profile Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex justify-end"
                >
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-2 px-6 rounded-md font-medium hover:shadow-lg transition duration-300"
                  >
                    Edit Profile
                  </motion.button> */}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;
