import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader/Loader";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { userNotExist } from "../../redux/reducers/userReducer";
import { useGetMyOrdersQuery } from "../../redux/api/orderApi";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="min-h-screen  flex justify-center items-center py-10">
          <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
            <div className="flex items-center space-x-6">
              <img
                src={user?.avatar[0]?.url || "https://via.placeholder.com/150"}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
              />
              <div>
                <h2 className="text-4xl font-dancing text-gray-800 ">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500 font-inter">
                  {user?.email}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-inter">
                  {moment(user?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <div className="mt-8 font-inter">
              <h3 className="text-xl font-semibold text-red-600">
                Account Details
              </h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <p className="font-medium">Full Name:</p>
                  <p>{user?.name}</p>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <p className="font-medium">Email Address:</p>
                  <p>{user?.email}</p>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <p className="font-medium">Phone Number:</p>
                  <p>+91 {user?.phoneNo}</p>
                </div>
            
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-red-600">
                Order History
              </h3>
              <div className="mt-4 space-y-4">
                {data?.orders?.map((order: any, index: number) => (
               <Link to={`/order/${order._id}`} key={index}>
                   <div
                    key={order.orderId}
                    className="flex justify-between items-center border-b py-4"
                  >
                    <div>
                      <p className="font-medium text-gray-700">
                        Order #{order.orderId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed: {order.status}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: {order.total}
                    </div>
                  </div>
               </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-red-600 font-semibold hover:underline">
                  <Link to="/myorders">View All Orders</Link>
                </button>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition">
                Edit Profile
              </button>
              <button
                disabled={logoutLoading}
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
                onClick={async () => {
                //@ts-ignore
                  await logoutUser().unwrap();
                  toast.success("Logged out successfully");
                  dispatch(userNotExist());
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
