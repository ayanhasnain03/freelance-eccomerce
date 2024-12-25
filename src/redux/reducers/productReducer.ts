import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  brands: [],
  price: [],
 sizes: [],
 rating:0,
  sort: "",
  page: 1,

};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setPrice: (state, action) => {

      state.price = action.payload;
    },
    setSizes:(state,action)=>{
      state.sizes = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRating:(state,action)=>{
      state.rating = action.payload
    },
    resetFilters: (state) => {
      state.categories = [];
      state.brands = [];
      state.price = [];
      state.sort = "";
      state.page = 1;
    },
  },
});

export default productSlice;

export const {
  setCategories,
  setBrands,
  setPrice,
  setSizes,
  setSort,
  setPage,
  resetFilters,
  setRating
} = productSlice.actions;
