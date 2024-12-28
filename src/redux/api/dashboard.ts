import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const dashboard = createApi({
  reducerPath: 'dashboard',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
    credentials: 'include',
  }),
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getWeekDashboard: builder.query({
      query: () => `/dashboard/weekdash`,
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,
    }),
    getDashCount: builder.query({
      query: () => `/dashboard/counts`,
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,
    }),
    gteLatestTransactions: builder.query({
      query: () => `/dashboard/latest-transactions`,
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,

    }),
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10}) => `/dashboard/orders?page=${page}&limit=${limit}`,
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,
    })
  }),
});

export const { useGetWeekDashboardQuery, useGetDashCountQuery, useGteLatestTransactionsQuery ,useGetAllOrdersQuery} = dashboard;

export default dashboard;
