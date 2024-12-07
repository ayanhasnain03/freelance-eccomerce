import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://free-ecco-backend.onrender.com/api/v1",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category",
      providesTags: ["Product"],
      // Enable caching
      keepUnusedDataFor: 60, // Cache data for 60 seconds
    }),
    getProducts: builder.query({
      query: ({ category, price, brand, sort, page }) => {
        let base = `/product`;
        const queryParams = [];

        if (category) queryParams.push(`category=${category}`);
        if (price && Array.isArray(price)) {
          queryParams.push(`price=${JSON.stringify(price)}`);
        }
        if (brand) queryParams.push(`brand=${brand}`);
        if (sort) queryParams.push(`sort=${sort}`);
        if (page) queryParams.push(`page=${page}`);

        if (queryParams.length > 0) {
          base += `?${queryParams.join("&")}`;
        }

        return base;
      },
      providesTags: ["Product"],
      // Enable caching
      keepUnusedDataFor: 60,
    }),
  }),
});

export default api;
export const { useGetProductsQuery, useGetCategoriesQuery } = api;
