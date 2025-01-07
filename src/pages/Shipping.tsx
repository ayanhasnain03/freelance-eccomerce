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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { subtotal, shippingCharges, tax, discount, total, cartItems } = useSelector((state: any) => state.cart);

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
    address: user?.shippingAddress?.address || "",
    city: user?.shippingAddress?.city || "",
    state: user?.shippingAddress?.state || "",
    pincode: user?.shippingAddress?.pincode || "",
    country: user?.shippingAddress?.country || "",
    phoneNo: user?.phoneNo || "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  //@ts-ignore
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

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
          { 
            amount: totalAmountInPaise,
          }
        );
       
        toast.success("Order placed successfully!");

        if (order.id) {
          initializeRazorpayPayment(order);
        } 
      } catch (error: any) {
        setPaymentStatus(error?.response?.data?.message || "Failed to place order.");
        toast.error(error?.data?.message || "Failed to place order.");
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
      razorpayOrderId: razorpayOrderId,
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
      shippingCharge: shippingCharges,
      customerPhoneNumber: formData.phoneNo,
      customerName: formData.name,
    };

    try {
      const response = await createOrder(orderData).unwrap();
      toast.success(response?.data?.message || "Order placed successfully!");
      dispatch(resetCart());
      navigate("/myOrders");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to place order.");
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
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          <section>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-white bg-blue-500 rounded-md"
              disabled={loading || isCreatingOrder}
            >
              {loading || isCreatingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
