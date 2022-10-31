import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constant/constant";

const productServices = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.auth?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    allCategory: builder.query({
      query: () => ({
        url: `category`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    allReview: builder.query({
      query: () => ({
        url: `product/allReview`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    singleCategory: builder.query({
      query: ({ categoryId }) => ({
        url: `category/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    addCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: `category/createCategory`,
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["products"],
    }),
    updateCategory: builder.mutation({
      query: (updateCateInfo) => ({
        url: `category/updateCategory/${updateCateInfo.id}`,
        method: "PUT",
        body: updateCateInfo,
      }),
      invalidatesTags: ["products"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `category/deleteCategory/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: `product/createProduct`,
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),
    allProduct: builder.query({
      query: () => ({
        url: `product`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    byCategoryProduct: builder.query({
      query: (category) => ({
        url: `/product/search`,
        method: "GET",
        params: category,
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `product/deleteProduct/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    singleProduct: builder.query({
      query: ({ productId }) => ({
        url: `product/${productId}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (updateProductInfo) => ({
        url: `product/updateProduct/${updateProductInfo.id}`,
        method: "PUT",
        body: updateProductInfo,
      }),
      invalidatesTags: ["products"],
    }),
    addReview: builder.mutation({
      query: (reviewInfo) => ({
        url: `product/review/${reviewInfo.id}`,
        method: "POST",
        body: reviewInfo,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useAllCategoryQuery,
  useAllReviewQuery,
  useAllProductQuery,
  useSingleCategoryQuery,
  useByCategoryProductQuery,
  useSingleProductQuery,
  useUpdateCategoryMutation,
  useAddReviewMutation,
  useUpdateProductMutation,
  useDeleteCategoryMutation,
  useDeleteProductMutation,
  useAddProductMutation,
} = productServices;
export default productServices;
