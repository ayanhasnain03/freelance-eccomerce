import { useState, useEffect } from "react";
import { useGetAllOrdersQuery } from "../../redux/api/dashboard";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useGetAllOrdersQuery({
    page: currentPage,
    limit: 10,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (orderId: string) => {
    alert(`Delete order with ID: ${orderId}`);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    alert(`Order status for ${orderId} updated to ${newStatus}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-6 text-red-500">
      //@ts-ignore
        Error: 
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
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
                <td className="px-6 py-4">{order.orderId}</td>
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
                      handleStatusChange(order.orderId, e.target.value)
                    }
                    className="px-3 py-2 bg-gray-50 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Returned">Returned</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(order.orderId);
                    }}
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
  );
};

export default Orders;
