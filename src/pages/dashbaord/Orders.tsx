import { useState, useEffect } from "react";
import { useGetAllOrdersQuery } from "../../redux/api/dashboard";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDeleteOrderByIdMutation, useUpdateOrderByIdMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import MenuBtn from "../../components/admin/MenuBtn";
import Skeleton from "../../components/shared/Skeleton";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteOrder,{isLoading:isDeleting}] = useDeleteOrderByIdMutation();
  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    page: currentPage,
  });
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderByIdMutation();

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= (data?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <MenuBtn />
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Orders
          </h1>

          <div className="overflow-hidden bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 text-sm text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Items</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {data?.orders.map((order: any) => (
                  <tr
                    key={order.orderId}
                    className="border-t cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`}>{order.orderId}</Link>
                    </td>
                    <td className="px-6 py-4">{order.customerName}</td>

                    <td className="px-6 py-4">
                      {order.items.map((item: any) => (
                        <Link
                          key={item.productId}
                          to={`/collections/item/${item.productId}`}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <span>
                            {item.name} (x{item.quantity})
                          </span>
                        </Link>
                      ))}
                    </td>
                    <td className="px-6 py-4">₹{order.total}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="px-3 py-2 bg-gray-50 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
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
                    <td className="px-6 py-4">
                      <button
                        onClick={async() =>
                          await deleteOrder(order._id).unwrap().then(() => {
                            toast.success("Order deleted successfully!");
                            refetch();
                          }).catch((error: any) => {
                            toast.error("Failed to delete order.");
                          })
                        }
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <FaTrash />
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
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition duration-150"
            >
              Previous
            </button>

            <span className="text-lg text-gray-800">
              Page {currentPage} of {data?.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data?.totalPages}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition duration-150"
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
