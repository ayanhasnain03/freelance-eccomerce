import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
    credentials: 'include',
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: ({ page = 1, limit = 10 }) => `/order/myorders?page=${page}&limit=${limit}`,
      providesTags: ['Order'],
      keepUnusedDataFor: 60,
    }),
    createOrders: builder.mutation({
      query: (data) => ({
        url: '/order/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetMyOrdersQuery, useCreateOrdersMutation } = orderApi;

export default orderApi;
