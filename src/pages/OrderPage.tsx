import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../redux/api/orderApi";
import { motion } from "framer-motion";

const OrderPage = () => {
  const params = useParams();
  const { data, isLoading, isError } = useGetOrderByIdQuery(params.id || "");

  if (isLoading) {
    return <div className="text-center text-lg font-medium text-gray-700">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="text-center text-lg font-medium text-red-500">Error loading order details.</div>;
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
  } = data?.order || {};

  return (
    <motion.div
      className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Order Details</h1>
      
      <div className="space-y-8">
        {/* Order Information */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Order Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
              <p className="text-gray-600">Payment Method: <span className="font-semibold">{paymentMethod}</span></p>
              <p className="text-gray-600">Payment Status: <span className="font-semibold">{paymentStatus}</span></p>
              <p className="text-gray-600">Order Status: <span className="font-semibold">{status}</span></p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Customer: <span className="font-semibold">{customerName}</span></p>
              <p className="text-gray-600">Phone: <span className="font-semibold">{customerPhoneNumber}</span></p>
              <p className="text-gray-600">Estimated Delivery: <span className="font-semibold">{new Date(estimatedDelivery).toLocaleDateString()}</span></p>
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Shipping Address</h2>
          <p className="text-gray-600">{shippingAddress.street}</p>
          <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
          <p className="text-gray-600">{shippingAddress.country}</p>
        </section>

        {/* Order Items */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">Items</h2>
          <ul className="space-y-4">
            {items?.map((item: any, index: number) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100">
                <div className="flex gap-6 items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </section>

  
        <section className="mt-8 border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Order Summary</h2>
          <div className="flex justify-between text-gray-600">
            <p>Subtotal:</p>
            <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Discount:</p>
            <p className="text-red-500">- ₹{discounts.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Tax:</p>
            <p className="font-semibold">₹{tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <p>Total:</p>
            <p className="text-xl">₹{total.toFixed(2)}</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default OrderPage;
