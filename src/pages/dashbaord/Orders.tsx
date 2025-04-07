import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuBtn from "../../components/admin/MenuBtn";
import Skeleton from "../../components/shared/Skeleton";
import { useGetAllOrdersQuery } from "../../redux/api/dashboard";
import {
  useDeleteOrderByIdMutation,
  useUpdateOrderByIdMutation,
} from "../../redux/api/orderApi";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    page: currentPage,
  });
  const [deleteOrder] = useDeleteOrderByIdMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderByIdMutation();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= (data?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({ id: orderId, data: { status: newStatus } }).unwrap();
      toast.dismiss();
      toast.success("Order status updated successfully!");
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.dismiss();
      toast.error("Failed to update order status. Please try again.");
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center py-6 text-red-500">
        Failed to load orders. Please refresh the page.
      </div>
    );
  }

  return (
    <>
      {isLoading || isUpdating ? (
        <Skeleton quantity={5} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-black min-h-screen">
          <MenuBtn />
          <h1 className="text-3xl font-semibold text-white text-center mb-6">
            Orders
          </h1>
          <div className="overflow-x-auto bg-gray-900 shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {data?.orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-indigo-400 hover:underline"
                      >
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.items.map((item) => (
                        <Link
                          key={item.productId}
                          to={`/collections/item/${item.productId}`}
                          className="flex items-center gap-2 mb-1"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-md border border-gray-700"
                          />
                          <span className="text-sm text-gray-300">
                            {item.name} (x{item.quantity})
                          </span>
                        </Link>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-200">
                      ₹{order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="px-2 py-1 border border-gray-600 rounded-md text-sm bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {[
                          "Pending",
                          "Shipped",
                          "Delivered",
                          "Canceled",
                          "Returned",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={async () =>
                          await deleteOrder(order._id)
                            .unwrap()
                            .then(() => {
                              toast.success("Order deleted successfully!");
                              refetch();
                            })
                            .catch((error) => {
                              toast.error(
                                error?.data?.message ||
                                  "Failed to delete order. Please try again."
                              );
                            })
                        }
                        className="text-red-400 hover:text-red-600 transition duration-200"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-700 transition duration-150"
            >
              Previous
            </button>
            <span className="text-base text-gray-300">
              Page {currentPage} of {data?.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data?.totalPages}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-700 transition duration-150"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
