import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://free-ecco-backend.onrender.com/api/v1",
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ forwhat }) => {
        let base = `/category`;
        const queryParams: string[] = [];
        if (forwhat) queryParams.push(`forwhat=${forwhat}`);
        if (queryParams.length > 0) {
          base += `?${queryParams.join("&")}`;
        }
        return base;
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 60, 
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getForWhat: builder.query({
      query: (forWhat) => `/category/what/${forWhat}`,
      providesTags: ["Product"],
    }),
    createCategories: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteCAtegories: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
 getProducts: builder.query({
  query: ({ category, price, brand, sort, page,discount,sizes,forwhat,rating }) => {
    let base = `/product`;
    const queryParams: string[] = [];
    if (category) queryParams.push(`category=${category}`);
    if (rating) queryParams.push(`rating=${rating}`);
    if (forwhat) queryParams.push(`forwhat=${forwhat}`);
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
}),
createFav: builder.mutation({

  query: (data) => ({
    url: "/user/wishlist",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["Product"],
}),
removeFav: builder.mutation({
  query: (data) => ({
    url: "/user/wishlist",
    method: "DELETE",
    body: data,
  }),
  invalidatesTags: ["Product"],
}),
getRelatedProducts: builder.query({
  query: (id) => ({
    url: `/product/related/${id}`,
    method: "GET",
  }),
  providesTags: ["Product"],
  keepUnusedDataFor: 60,
}),
createReview: builder.mutation({
  query: (formData) => ({
    url: "/review/create",
    method: "POST",
    body: formData, 
  }),
  invalidatesTags: ["Product"],
  
}),
getReviews: builder.query({
  query: (id) => ({
    url: `/review/${id}`,
    method: 'GET',
  }),
  providesTags: ['Product'],
  keepUnusedDataFor: 60,
}),
deleteReview: builder.mutation({
  query: (id) => ({
    url: `/review/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Product'],
}),
getTopSellingProduct: builder.query({
  query: () => ({
    url: `/product/top-selling`,
    method: 'GET',
  }),
  providesTags: ['Product'],
  keepUnusedDataFor: 60,
}),
newArrivals: builder.query({
  query: () => ({
    url: `/product/new-arrivals`,
    method: 'GET',
  }),
  providesTags: ['Product'],
  keepUnusedDataFor: 60,
}),
getSaleProducts: builder.query({
  query: () => ({
    url: `/product/sale`,
    method: 'GET',
  }),
  providesTags: ['Product'],
  keepUnusedDataFor: 60,

})
  })
});

export default api;
export const { useGetProductsQuery, useGetCategoriesQuery,useCreateProductMutation,useGetForWhatQuery,useCreateCategoriesMutation,useDeleteCAtegoriesMutation,useGetProductByIdQuery,useNewArriavalsQuery,useCreateFavMutation,useRemoveFavMutation,useGetRelatedProductsQuery,useCreateReviewMutation,useGetReviewsQuery,useDeleteReviewMutation,useGetTopSellingProductQuery,useNewArrivalsQuery,useGetSaleProductsQuery } = api;
