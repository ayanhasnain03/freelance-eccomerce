import {useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/api/orderApi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
import { FaShoppingBag, FaUser, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const OrderPage = () => {
  const _id = useSelector((state: any) => state.user.user?._id);
  const role = useSelector((state: any) => state.user.user?.role);
  const params = useParams();
  const { data, isLoading, isError } = useGetOrderByIdQuery(params.id || "");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-red-50 rounded-lg text-red-600 font-medium text-lg shadow-lg">
          Error loading order details. Please try again later.
        </div>
      </div>
    );
  }

  const {
    orderId,
    customerName,
    customerPhoneNumber,
    shippingAddress,
    items,
    subtotal,
    tax,
    total,
    paymentMethod,
    paymentStatus,
    status,
    estimatedDelivery,
    discounts,
    userId,
    shippingCharge
  } = data?.order || {};

  if (role !== "admin" && userId !== _id) {
    return <PageNotFound />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 lg:p-10 my-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h1 className="text-4xl font-bold text-white text-center">Order Details</h1>
          <p className="text-center text-white/80 mt-2">Order ID: #{orderId}</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Order Status Banner */}
          <div className={`${getStatusColor(status)} p-4 rounded-lg text-center font-semibold text-lg`}>
            Order Status: {status}
          </div>

          {/* Order Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <FaShoppingBag className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold">{paymentMethod}</p>
                  <p className={`text-sm ${paymentStatus.toLowerCase() === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {paymentStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <FaUser className="text-purple-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Customer Details</p>
                  <p className="font-semibold">{customerName}</p>
                  <p className="text-sm text-gray-600">{customerPhoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <FaTruck className="text-green-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-semibold">
                    {new Date(estimatedDelivery).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <FaMoneyBillWave className="text-yellow-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-lg">₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <div className="space-y-2 text-gray-600">
              <p>{shippingAddress.street}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
              <p>{shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
            <div className="space-y-4">
              {items?.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row justify-between items-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">₹{item.price} per item</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mt-4 sm:mt-0">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Charge</span>
                <span>₹{shippingCharge?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-red-500">- ₹{discounts.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderPage;
