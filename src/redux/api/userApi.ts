import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/user/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST", 
      }),
      invalidatesTags: ["User"], 
    }),
    
    foregetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgetpassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/resetpassword/${token}`,
        method: "POST",
        body: data,
      }),
    })

  }),
});




export default userApi;
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,useForegetPasswordMutation,useResetPasswordMutation } = userApi;
