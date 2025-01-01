import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  calculatePrice,
  removeToCart,
} from "../redux/reducers/cartReducer";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";

const formatCurrency = (amount: number) => {
  return `₹${amount.toFixed(2)}`;
};

const CartPage: React.FC = () => {
  const { cartItems, subtotal, shippingCharges, tax, total } =
    useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");

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

  const appliedDiscount = coupon === "DISCOUNT10" ? subtotal * 0.1 : 0;

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-xl">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: {formatCurrency(item.price)}
                    </p>
                    
                    <del className="text-sm text-gray-500">
                      MRP: {item.realPrice}
                    </del>
                    
                  </div>
                </div>

             
                <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
                  <div className="text-xl font-semibold text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                 
                  <div className="flex gap-3 items-center">
                    <button
                      aria-label="Decrease quantity"
                      className="text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => handleDecrement(item)}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      className="text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => handleIncrement(item)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <button
                  aria-label="Remove item"
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 text-xl hover:text-red-700 transition-colors"
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="w-full lg:w-80 p-6 bg-white rounded-lg shadow-md mt-8 lg:mt-0">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

  
        <div className="mb-6">
          <label htmlFor="coupon" className="text-sm font-medium text-gray-600">
            Coupon Code
          </label>
          <input
            type="text"
            id="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter coupon code"
          />
          <div className="text-sm text-green-500 mt-2">
            {coupon === "DISCOUNT10" ? "Coupon applied! 10% off." : ""}
          </div>
        </div>

  
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Subtotal</h3>
            <span className="text-lg">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Discount</h3>
            <span className="text-lg text-red-500">
              {appliedDiscount > 0 ? `- ${formatCurrency(appliedDiscount)}` : "₹0.00"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Shipping</h3>
            <span className="text-lg">{formatCurrency(shippingCharges)}</span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tax (18%)</h3>
            <span className="text-lg">{formatCurrency(tax)}</span>
          </div>
        </div>

    
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-gray-800">Total</h2>
          <span className="text-xl font-bold text-gray-800">{formatCurrency(total)}</span>
        </div>

     
      
        <button
  className={`w-full py-3 px-4 rounded-lg mt-6 font-semibold transition-colors duration-300 
    ${cartItems.length === 0 
      ? 'cursor-not-allowed bg-gray-400 text-gray-700' 
      : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}
  `}
  disabled={cartItems.length === 0} 
>
  <Link 
    to={cartItems.length > 0 ? "/cart/shipping" : "#"} 
    className={`${cartItems.length === 0 ? 'pointer-events-none' : ''}`}
  >
    Checkout
  </Link>
</button>

        

       
        <button
          onClick={handleResetCart}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg mt-4 hover:bg-red-700 transition-colors font-semibold"
        >
          Reset Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
