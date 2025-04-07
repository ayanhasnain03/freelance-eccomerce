import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader/Loader";
import { useGetMyOrdersQuery } from "../redux/api/orderApi";

const MyOrders = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMyOrdersQuery({ page: step });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const orders = data?.orders || [];
  const totalPages = data?.totalPage || 1;
  const totalOrders = data?.orderCount || 0;

  const handlePage = (page: number) => setStep(page);
  const handleNext = () => step < totalPages && setStep(step + 1);
  const handlePrev = () => step > 1 && setStep(step - 1);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (step > 2) pages.push(1);
      if (step > 3) pages.push("...");
      if (step > 1) pages.push(step - 1);
      pages.push(step);
      if (step < totalPages) pages.push(step + 1);
      if (step < totalPages - 2) pages.push("...");
      if (step < totalPages - 1) pages.push(totalPages);
    }
    return pages;
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load orders
      </div>
    );

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          My Orders <span className="text-blue-500">({totalOrders})</span>
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Order ID",
                    "Date",
                    "Items",
                    "Total",
                    "Est. Delivery",
                    "Actions",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(order.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {order.items.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-3 mb-2"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                            loading="lazy"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {moment(order.estimatedDelivery).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              {generatePageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="text-gray-500 px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePage(page as number)}
                    className={`px-3 py-1.5 text-sm rounded-md ${
                      page === step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={handleNext}
                disabled={step === totalPages}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <span className="text-gray-700 text-sm">
              Page <span className="font-semibold">{step}</span> of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
