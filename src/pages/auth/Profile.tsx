import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader/Loader";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";
import { useGetMyOrdersQuery } from "../../redux/api/orderApi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const naviagte = useNavigate();
  const { user, isLoading } = useSelector((state: any) => state.user);

  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();
  const { data } = useGetMyOrdersQuery({
    limit: 5,
  });
  const dispatch = useDispatch();
  if (!user?._id) {
    dispatch(userNotExist());
    naviagte("/login");
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
          className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center py-10 px-4"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-sm bg-opacity-95"
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                <img
                  src={user?.avatar[0]?.url || "https://via.placeholder.com/150"}
                  alt="Profile Picture"
                  className="relative w-40 h-40 rounded-full border-4 border-white object-cover"
                />
              </motion.div>
              <div className="text-center md:text-left">
                <h2 className="text-5xl font-dancing bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.name}
                </h2>
                <p className="text-lg text-gray-600 font-inter mt-2">
                  {user?.email}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-inter italic">
                  Member since {moment(user?.createdAt).format('MMMM YYYY')}
                </p>
              </div>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 font-inter"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Account Details
              </h3>
              <div className="mt-6 space-y-4 bg-gray-50 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition">
                  <p className="font-medium">Full Name:</p>
                  <p className="font-light">{user?.name}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition">
                  <p className="font-medium">Email Address:</p>
                  <p className="font-light">{user?.email}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition">
                  <p className="font-medium">Phone Number:</p>
                  <p className="font-light">+91 {user?.phoneNo}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Recent Orders
              </h3>
              <div className="mt-6 space-y-4">
                {data?.orders?.map((order: any, index: number) => (
                  <Link to={`/order/${order._id}`} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:shadow-md transition duration-300"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          Order #{order.orderId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status: <span className="text-green-600 font-medium">{order.status}</span>
                        </p>
                      </div>
                      <div className="text-lg font-medium text-gray-800">
                        ₹{order.total}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
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

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 px-8 rounded-xl font-medium hover:shadow-lg transition duration-300"
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={logoutLoading}
                className="bg-gray-200 text-gray-800 py-3 px-8 rounded-xl font-medium hover:bg-gray-300 hover:shadow-lg transition duration-300"
                onClick={async () => {
                  //@ts-ignore
                  await logoutUser().unwrap();
                  toast.success("Logged out successfully");
                  dispatch(userNotExist());
                }}
              >
                Logout
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;
