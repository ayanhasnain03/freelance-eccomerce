import { useGetMyOrdersQuery } from "../redux/api/orderApi";
import { motion } from "framer-motion";
import Loader from "../components/shared/Loader/Loader";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useState } from "react";

const MyOrders = () => {
  const [step, setStep] = useState(1); // Start with page 1
  const { data, isLoading, isError } = useGetMyOrdersQuery({ page: step });
  console.log(data);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error loading orders
      </div>
    );
  }

  const orders = data?.orders;
  const totalPages = data?.totalPage || 1; 
  const totalOrders = data?.orderCount || 0; 

  const handleNext = () => {
    if (step < totalPages) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePage = (page: number) => {
    setStep(page);
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (step > 2) pages.push(1);
      if (step > 3) pages.push("...");
      pages.push(step);
      if (step < totalPages - 1) pages.push("...");
      if (step < totalPages) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders ({totalOrders})</h1>
        {orders?.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            You have no orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Estimated Delivery Date
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                      {order.items.map((item: any) => (
                        <div key={item._id} className="flex items-center mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg mr-3"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-sm font-medium text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                      {moment(order.estimatedDelivery).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300 text-sm">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <div className="mx-4 flex items-center space-x-2">
              {generatePageNumbers().map((page: any, index) =>
                page === "..." ? (
                  <span key={index} className="text-sm text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePage(page)}
                    className={`${
                      page === step
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-3 py-1 rounded-lg`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={step === totalPages}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <span className="text-lg font-medium text-gray-800">
            Page {step} of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
