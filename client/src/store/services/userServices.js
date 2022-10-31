import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constant/constant";
const userServices = createApi({
  reducerPath: "users",
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
    updateProfile: builder.mutation({
      query: (updateData) => ({
        url: "auth/updateProfile",
        method: "PUT",
        body: updateData,
      }),
    }),
    changePassword: builder.mutation({
      query: (updatePassword) => ({
        url: "auth/changePassword",
        method: "PUT",
        body: updatePassword,
      }),
    }),
    addWishlist: builder.mutation({
      query: (product) => ({
        url: `auth/wishlist/${product.productId}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
    saveOrderInfo: builder.mutation({
      query: (orderInfo) => ({
        url: `product/saveOrderInfo`,
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["user"],
    }),
    createOrderBySSL: builder.mutation({
      query: (orderInfo) => ({
        url: `product/init`,
        method: "POST", 
        body: orderInfo,
      }),
      invalidatesTags: ["user"],
    }),
    
    getSingleUser: builder.query({
      query: () => ({
        url: `auth/singleUser`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    createOrder: builder.mutation({
      query: (totalCost) => ({
        url: `product/create-payment-intent`,
        method: "POST",
        body: totalCost,
      }),
      invalidatesTags: ["user"],
    }),
    allOrder: builder.query({
      query: () => ({
        url: `product/allOrder`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateOrderStatus: builder.mutation({
      query: (updateInfo) => ({
        url: `product/updateOrder/${updateInfo._id}`,
        method: "PUT",
        body: updateInfo,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useGetSingleUserQuery,
  useAddWishlistMutation,
  useCreateOrderMutation,
  useSaveOrderInfoMutation,
  useAllOrderQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderBySSLMutation
} = userServices;
export default userServices;
