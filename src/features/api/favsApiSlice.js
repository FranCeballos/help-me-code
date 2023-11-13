const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const favsApiSlice = createApi({
  reducerPath: "favsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/favs" }),
  endpoints: (builder) => ({
    getUserFavs: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    toggleFav: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useLazyGetUserFavsQuery, useToggleFavMutation } = favsApiSlice;
