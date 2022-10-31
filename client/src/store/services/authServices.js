import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constant/constant";
const authServices = createApi({
  reducerPath: "authentication",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.auth?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "auth/allUsers",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserRole: builder.mutation({
      query: (body) => ({
        url: `auth/updateRole/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    signup: builder.mutation({
      query: (signupData) => ({
        headers: { "Content-Type": "application/json" },
        url: "auth/signup",
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (loginData) => ({
        headers: { "Content-Type": "application/json" },
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authServices;
export default authServices;
