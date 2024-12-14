import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface FormData {
  name: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNo: string;
  secondPhoneNo: string;
}

const ShippingPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const { subtotal, shippingCharges, tax, discount, total } = useSelector((state: any) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'razorpay'>('COD');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phoneNo: '',
    secondPhoneNo: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.phoneNo) {
      alert('Please fill in all required fields.');
      return;
    }

    if (paymentMethod === 'razorpay') {
      try {
        setLoading(true);
        const totalAmountInPaise = Math.round(total)

        const { data: order } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/create-payment`, {
          amount: totalAmountInPaise,
        });

        if (order.id) {
          initializeRazorpayPayment(order);
        } else {
          alert('Invalid order response from server.');
        }
      } catch (error: any) {
        console.error('Error creating order:', error.response || error.message);
        alert(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Order placed successfully with COD');
      navigate('/myOrders');
    }
  };

  const initializeRazorpayPayment = (order: { id: string; amount: number }) => {
    const options = {
      key: 'rzp_test_H3dRMlyt954d2B',
      amount: order.amount,
      currency: 'INR',
      order_id: order.id,
      name: formData.name,
      description: 'Your order description',
      handler: async (response: any) => {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payment/verify`, {
            razorpay_order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (data.success) {
            alert('Payment verified successfully! Your order is placed.');
            navigate('/myOrders');
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          alert('An unexpected error occurred during payment verification.');
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
        color: '#3399cc',
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Enter Shipping Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, ' $1')}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={(formData as any)[key]}
                onChange={(e) => handleInputChange(e, key as keyof FormData)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="space-x-4">
            <button
              onClick={() => setPaymentMethod('COD')}
              className={`p-2 rounded-md border ${paymentMethod === 'COD' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => setPaymentMethod('razorpay')}
              className={`p-2 rounded-md border ${paymentMethod === 'razorpay' ? 'bg-blue-500 text-white' : 'bg-white'}`}
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
            disabled={loading}
          >
            {loading ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order (COD)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;