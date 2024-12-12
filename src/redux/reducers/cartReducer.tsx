import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for cart items
interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  selectedSize: string;
  stock: number; // Added stock for validation during increment
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

// Define the initial state type
interface CartState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}

const getInitialState = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : {
        loading: false,
        cartItems: [],
        subtotal: 0,
        shippingCharges: 0,
        tax: 0,
        discount: 0,
        total: 0,
        shippingInfo: {
          address: "",
          city: "",
          state: "",
          pinCode: 0,
          country: "",
        },
      };
};

const initialState: CartState = getInitialState();

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
addToCart: (state, action: PayloadAction<CartItem>) => {
  state.loading = true;

  const index = state.cartItems.findIndex((item) => item._id === action.payload._id);

  if (index === -1) {
    // Add a new item to the cart
    state.cartItems.push(action.payload);
  } else {
    // Update quantity and other properties of the existing item
    state.cartItems[index].quantity = action.payload.quantity;
  }

  localStorage.setItem("cart", JSON.stringify(state));
  state.loading = false; // Ensure loading is set back to false
},


    removeToCart: (state, action: PayloadAction<string>) => {
      // Remove item by ID
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    calculatePrice: (state) => {
      // Calculate subtotal
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Calculate shipping charges
      state.shippingCharges = state.subtotal > 1000 ? 0 : 250;

      // Calculate tax (18% of subtotal)
      state.tax = parseFloat((state.subtotal * 0.18).toFixed(2));

      // Reset discount for now (can be modified for coupon logic)
      state.discount = 0;

      // Calculate total
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;

      // Update localStorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          subtotal: state.subtotal,
          shippingCharges: state.shippingCharges,
          tax: state.tax,
          discount: state.discount,
          total: state.total,
          shippingInfo: state.shippingInfo,
        })
      );
    },

    updateShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeToCart, calculatePrice, updateShippingInfo } =
  cartReducer.actions;

export default cartReducer.reducer;
