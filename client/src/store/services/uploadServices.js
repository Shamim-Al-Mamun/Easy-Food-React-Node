import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uploadServices = createApi({
  reducerPath: "upload",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.cloudinary.com/v1_1/dxvabm8zy/image",
  }),
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (images) => ({
        url: `upload`,
        method: "POST",
        body: images,
      }),
    }),
  }),
});

export const { useUploadImagesMutation } = uploadServices;
export default uploadServices;
