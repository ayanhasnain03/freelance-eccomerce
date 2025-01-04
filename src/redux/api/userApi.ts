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
    }),
    getAllUsers: builder.query({
      query: ({ keyword, page,}) => {
        let base = `/user/all`;
        const queryParams: string[] = [];
        if (keyword) queryParams.push(`keyword=${keyword}`);
        if (page) queryParams.push(`page=${page}`);
        if (queryParams.length > 0) {
          base += `?${queryParams.join("&")}`;
        }
    
        return base;
      },
      providesTags: ["User"],
      keepUnusedDataFor: 60,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUserROle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: "/user/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getAllContacts: builder.query({
      query: ({page,limit}) => {
        let base = `/user/contacts`;
        const queryParams: string[] = [];
        if (page) queryParams.push(`page=${page}`);
        if (limit) queryParams.push(`limit=${limit}`);
        if (queryParams.length > 0) {
          base += `?${queryParams.join("&")}`;
        }
    
        return base;
      },

      providesTags: ["User"],
    }),
    replyContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/contact/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    })
  }),

});




export default userApi;
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,useForegetPasswordMutation,useResetPasswordMutation,useGetAllUsersQuery,useDeleteUserMutation,useUpdateUserROleMutation,useCreateContactMutation,useGetAllContactsQuery,useReplyContactMutation } = userApi;
