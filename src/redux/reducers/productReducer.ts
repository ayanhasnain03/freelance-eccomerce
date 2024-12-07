import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [], // Selected category filters
  brands: [], // Selected brand filters
  price: [], // Price range filter as an array of { min, max }
  sort: "", // Sorting criteria
  page: 1, // Current page for pagination
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
      // Ensure price is set as an array of { min, max }
      state.price = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      // Resets all filters to their initial values
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
  setSort,
  setPage,
  resetFilters,
} = productSlice.actions;
