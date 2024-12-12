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

interface OrderDetails {
  id: string;
  amount: number;
}

const ShippingPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const {  subtotal, shippingCharges, tax, discount, total } = useSelector((state: any) => state.cart);
  console.log('Total amount:', total);

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'razorpay'>('COD');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
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
  if (
    !formData.name ||
    !formData.address ||
    !formData.city ||
    !formData.state ||
    !formData.pincode ||
    !formData.phoneNo
  ) {
    alert('Please fill in all required fields.');
    return;
  }

  if (paymentMethod === 'razorpay') {
    try {
      setLoading(true);

      // Razorpay expects the amount in paise (integer)
      const totalAmountInPaise = Math.round(total * 100);
      console.log('Sending total amount in paise:', totalAmountInPaise);

      const response = await axios.post('http://localhost:3000/api/v1/payment/create-payment', {
        amount: totalAmountInPaise, // Corrected format
      });

      console.log('Backend Response:', response.data);

      const order = response.data;
      if (order.id) {
        setOrderDetails(order);
        handleRazorpayPayment(order.id);
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



  const handleRazorpayPayment = (orderId: string) => {
    //@ts-ignore
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout-static-next.razorpay.com/v2/checkout.js';
      script.onload = () => {
        initializeRazorpayPayment(orderId);
      };
      document.body.appendChild(script);
    } else {
      initializeRazorpayPayment(orderId);
    }
  };

  const initializeRazorpayPayment = (orderId: string) => {
    if (!orderDetails) return;

    const options = {
      key: 'rzp_test_H3dRMlyt954d2B',
      amount: orderDetails.amount * 100, // Convert to paise
      currency: 'INR',
      order_id: orderId,
      name: formData.name,
      description: 'Your order description',
      image: 'https://example.com/your-logo.png',
      handler: function (response: any) {
        alert('Payment success! Payment ID: ' + response.razorpay_payment_id);
        verifyPayment(response.razorpay_payment_id, orderId, response.razorpay_signature);
      },
      prefill: {
        name: formData.name,
        email: user.email,
        contact: formData.phoneNo,
      },
      notes: {
        address: formData.address,
      },
    };
//@ts-ignore
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const verifyPayment = async (paymentId: string, orderId: string, razorpaySignature: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/payment/verify',
        {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: razorpaySignature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert('Payment verified successfully! Your order is placed.');
        navigate('/myOrders');
      } else {
        alert('Payment verification failed. Please contact support.');
        console.error('Verification Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('An unexpected error occurred during payment verification. Please try again later.');
    }
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
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Choose Payment Method:</label>
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
            </div>
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

        <div className="flex justify-between items-center mt-8">
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
