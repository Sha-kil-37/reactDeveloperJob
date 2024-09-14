import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://dummyjson.com` }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => `/products?limit=0`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProductsCategorys: builder.query({
      query: () => `/products/categories`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
       
        
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetProductsCategorysQuery,
  useUpdateProductMutation,
} = productApi;
