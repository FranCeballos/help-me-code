const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const categoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/categories" }),
  endpoints: (builder) => ({
    getCategoryByCustomId: builder.query({
      query: (customId) => ({
        url: `/${customId}`,
      }),
    }),
    postCreateCategory: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    putUpdateCategory: builder.mutation({
      query: ({ customId, body }) => ({
        url: `/${customId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetCategoryByCustomIdQuery,
  usePostCreateCategoryMutation,
  usePutUpdateCategoryMutation,
} = categoryApiSlice;
