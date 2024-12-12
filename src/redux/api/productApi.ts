import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://free-ecco-backend.onrender.com/api/v1",
    baseUrl: "https://free-ecco-backend.onrender.com/api/v1",
    credentials: "include",
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
  query: ({ category, price, brand, sort, page,discount,sizes }) => {
    let base = `/product`;
    const queryParams: string[] = [];
    if (category) queryParams.push(`category=${category}`);
  if(price) queryParams.push(`price=${price}`);
    if (brand) queryParams.push(`brand=${brand}`);
    if (discount) queryParams.push(`discount=${discount}`);
    if (sort) queryParams.push(`sort=${sort}`);
    if (page) queryParams.push(`page=${page}`);
    if (sizes) queryParams.push(`sizes=${sizes}`);
    if (queryParams.length > 0) {
      base += `?${queryParams.join("&")}`;
    }

    return base;
  },
  providesTags: ["Product"],
  keepUnusedDataFor: 60,
}),

getProductById: builder.query({
  query: (id) => `/product/${id}`,
  providesTags: ["Product"],
  keepUnusedDataFor: 60,
}),
newArriavals: builder.query({
  query: () => `/product/new-arrivals`,
  providesTags: ["Product"],
  keepUnusedDataFor: 60,
})

  }),
});

export default api;
export const { useGetProductsQuery, useGetCategoriesQuery,useGetProductByIdQuery,useNewArriavalsQuery } = api;
