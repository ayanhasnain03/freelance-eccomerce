import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { resetCart, setShippingInfo } from "../redux/reducers/cartReducer";
import { useCreateOrdersMutation } from "../redux/api/orderApi";
import axios from "axios";

interface FormData {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNo: string;
}

const ShippingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { subtotal, shippingCharges, tax, discount, total, cartItems, shippingInfo } = useSelector((state: any) => state.cart);

  const modifiedCartItems = useMemo(() => {
    return cartItems.map((item: any) => ({
      productId: item._id,
      name: item.productName,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      size: item.sizes,
    }));
  }, [cartItems]);

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "razorpay">("COD");
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    address: shippingInfo?.address || "",
    city: shippingInfo?.city || "",
    state: shippingInfo?.state || "",
    pincode: shippingInfo?.pinCode || "",
    country: shippingInfo?.country || "",
    phoneNo: user?.phoneNo || "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use the createOrders mutation
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrdersMutation();

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.phoneNo) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    dispatch(setShippingInfo({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pincode,
      country: formData.country,
    }));

    if (paymentMethod === "razorpay") {
      try {
        const totalAmountInPaise = Math.round(total);
        const { data: order } = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/payment/create-payment`,
          { amount: totalAmountInPaise }
        );

        if (order.id) {
          initializeRazorpayPayment(order);
        } else {
          toast.error("Invalid order response from server.");
        }
      } catch (error: any) {
        setPaymentStatus("Payment creation failed. Please try again.");
        console.error("Error creating order:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      await placeOrder();
    }
  };

  const placeOrder = async (razorpayOrderId: string | null = null) => {
    const orderData = {
      userId: user._id,
      razorpayOrderId: razorpayOrderId, // Pass razorpayOrderId here
      items: modifiedCartItems,
      paymentMethod: paymentMethod,
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.pincode,
        country: formData.country,
      },
      discounts: discount,
      tax,
      subtotal,
      total,
      customerPhoneNumber: formData.phoneNo,
      customerName: formData.name,
    };

    try {
      // Use the createOrders mutation here
      const response = await createOrder(orderData).unwrap();
      console.log("Order created:", response);
      toast.success("Order placed successfully!");
      dispatch(resetCart());
      navigate("/myOrders");
    } catch (error) {
      toast.error("Order creation failed. Please try again.");
      console.error("Error creating order:", error);
    }
  };

  const initializeRazorpayPayment = (order: { id: string; amount: number }) => {
    const options = {
      key: "rzp_test_H3dRMlyt954d2B",
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: formData.name,
      description: "Your order description",
      handler: async (response: any) => {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER}/api/v1/payment/verify`,
            {
              razorpay_order_id: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (data.success) {
            toast.success("Payment successful, order placed.");
            await placeOrder(order.id);
            toast.success("Invoice sent to your email.");
          } else {
            setPaymentStatus("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          setPaymentStatus("Error during payment verification.");
          console.error("Error verifying payment:", error);
        }
      },
      prefill: {
        name: formData.name,
        email: user.email,
        contact: formData.phoneNo,
      },
      notes: {
        address: formData.address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    //@ts-ignore
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="flex max-w-7xl mx-auto space-x-8">
        {/* Left Side: Shipping Form */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Enter Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <div key={key} className="w-full">
                  <input
                    type="text"
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={(formData as any)[key]}
                    onChange={(e) => handleInputChange(e, key as keyof FormData)}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <div className="space-x-4">
              <button
                onClick={() => setPaymentMethod("COD")}
                className={`p-2 rounded-md border ${paymentMethod === "COD" ? "bg-blue-500 text-white" : "bg-white"}`}
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod("razorpay")}
                className={`p-2 rounded-md border ${paymentMethod === "razorpay" ? "bg-blue-500 text-white" : "bg-white"}`}
              >
                Online Payment (Razorpay)
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>₹{shippingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white py-2 px-6 rounded-md"
              disabled={loading || isCreatingOrder}
            >
              {loading || isCreatingOrder
                ? "Processing..."
                : paymentMethod === "razorpay"
                ? "Pay Now"
                : "Place Order (COD)"}
            </button>
          </div>

          {paymentStatus && (
            <div className="mt-4 text-center text-red-500">{paymentStatus}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
