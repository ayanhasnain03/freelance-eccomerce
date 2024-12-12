import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  calculatePrice,
  removeToCart,
} from "../redux/reducers/cartReducer";
import { Link } from "react-router-dom";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return `₹${amount.toFixed(2)}`;
};

const CartPage: React.FC = () => {
  const { cartItems, subtotal, shippingCharges, tax, discount, total } =
    useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  // State for coupon
  const [coupon, setCoupon] = useState("");

  // Handlers
  const handleRemoveItem = (id: string) => {
    dispatch(removeToCart(id));
  };

  const handleDecrement = (cartItem: any) => {
    if (cartItem.quantity > 1) {
      dispatch(
        addToCart({
          ...cartItem,
          quantity: cartItem.quantity - 1,
        })
      );
    }
  };

  const handleIncrement = (cartItem: any) => {
    if (cartItem.stock > cartItem.quantity) {
      dispatch(
        addToCart({
          ...cartItem,
          quantity: cartItem.quantity + 1,
        })
      );
    }
  };

  const handleResetCart = () => {
    cartItems.forEach((item: any) => dispatch(removeToCart(item._id)));
  };

  // Apply discount based on coupon
  const appliedDiscount = coupon === "DISCOUNT10" ? subtotal * 0.1 : 0;

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      {/* Cart Items */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    aria-label="Decrease quantity"
                    className="text-gray-600 text-xl font-bold"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="text-gray-600 text-xl font-bold"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold">
                  {formatCurrency(item.price * item.quantity)}
                </div>
                <button
                  aria-label="Remove item"
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 text-xl ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar - Calculation and Discounts */}
      <div className="w-80 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {/* Coupon Section */}
        <div className="mb-4">
          <label htmlFor="coupon" className="text-sm font-medium">
            Coupon Code
          </label>
          <input
            type="text"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-2 mt-2 border rounded-lg"
            placeholder="Enter coupon code"
          />
          <div className="text-sm text-gray-500 mt-2">
            {coupon === "DISCOUNT10" ? "Coupon applied! 10% off." : ""}
          </div>
        </div>

        {/* Total Calculation */}
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-semibold">Subtotal</h3>
          <span className="text-lg">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-semibold">Discount</h3>
          <span className="text-lg text-red-500">
            {appliedDiscount > 0 ? `- ${formatCurrency(appliedDiscount)}` : "₹0.00"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-semibold">Shipping</h3>
          <span className="text-lg">{formatCurrency(shippingCharges)}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <h3 className="text-lg font-semibold">Tax (18%)</h3>
          <span className="text-lg">{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold">Total</h2>
          <span className="text-xl font-bold">{formatCurrency(total)}</span>
        </div>

        {/* Checkout Button */}
<Link to="/cart/shipping">
        <button  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-8 font-semibold">
          Checkout
        </button>
        </Link>

        {/* Reset Button */}
        <button
          onClick={handleResetCart}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mt-4 font-semibold"
        >
          Reset Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
