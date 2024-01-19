const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const categoryApiSlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/categories" }),
  endpoints: (builder) => ({
    postCreateCategory: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostCreateCategoryMutation } = categoryApiSlice;
