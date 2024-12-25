import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the user and wishlist item
interface User {
  _id?: string;
  name?: string;
  email?: string;
  // Add other fields as needed
}

// Define the state type
interface UserState {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  wishlist: string[]; // List of product IDs
}

// Define the initial state using the UserState type
const initialState: UserState = {
  user: {},
  isAuthenticated: false,
  loading: true,
  wishlist: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user when authenticated
    userExist: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    // Action to reset user when not authenticated
    userNotExist: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.loading = false;
    },

    // Action to add product to wishlist
    addtoWishList: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      // Check if productId is already in the wishlist
      const alreadyAdded = state.wishlist.includes(productId);
      if (!alreadyAdded) {
        state.wishlist.push(productId); // Add to wishlist if not already added
      }
    },

    // Action to remove product from wishlist
    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(item => item !== action.payload);
    },
  },
});

// Export actions
export const { userExist, userNotExist, addtoWishList, removeFromWishList } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
