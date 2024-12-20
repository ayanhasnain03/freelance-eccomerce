import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  price: number;
  quantity: number;
  selectedSize: string;
  stock: number; 
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}


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

      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index === -1) {
       
        state.cartItems.push(action.payload);
      } else {
       
        state.cartItems[index].quantity = action.payload.quantity;
      }

      localStorage.setItem("cart", JSON.stringify(state));
      state.loading = false; 
    },

    removeToCart: (state, action: PayloadAction<string>) => {
      
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

     
      localStorage.setItem("cart", JSON.stringify(state));
    },

    calculatePrice: (state) => {
 
      state.subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );


      state.shippingCharges = state.subtotal > 1000 ? 0 : 250;

   
      state.tax = parseFloat((state.subtotal * 0.18).toFixed(2));

     
      state.discount = 0;


      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;

 
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

    setShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => {
      Object.assign(state, {
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
      });

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeToCart,
  calculatePrice,
  setShippingInfo,
  resetCart,
} = cartReducer.actions;

export default cartReducer.reducer;
