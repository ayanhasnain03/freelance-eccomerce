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
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});


export const loadUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/user/me`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
};


export default userApi;
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = userApi;
