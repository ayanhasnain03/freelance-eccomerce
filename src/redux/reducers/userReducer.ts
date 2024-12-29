import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
  _id?: string;
  name?: string;
  email?: string;

}


interface UserState {
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  wishlist: string[]; 
}


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

    userExist: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },


    userNotExist: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.loading = false;
    },

   
    addtoWishList: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
     
      const alreadyAdded = state.wishlist.includes(productId);
      if (!alreadyAdded) {
        state.wishlist.push(productId); 
      }
    },


    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(item => item !== action.payload);
    },
  },
});


export const { userExist, userNotExist, addtoWishList, removeFromWishList } = userSlice.actions;


export default userSlice.reducer;
