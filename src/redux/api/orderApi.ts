import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
        credentials: "include",
    }),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        getMyOrders: builder.query({
        query: ({page,limit}) => {
            if(page){
                return `/order/myorders?page=${page}`
            }
            if(limit){
                return `/order/myorders?limit=${limit}`
            }
            return "/order/myorders"
        },
        providesTags: ["Order"],
        keepUnusedDataFor: 60,
        }),
    }),
    });
export default orderApi;

export const { useGetMyOrdersQuery } = orderApi;