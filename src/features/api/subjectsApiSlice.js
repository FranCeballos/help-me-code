const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const subjectsApiSlice = createApi({
  reducerPath: "subjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/subjects" }),
  endpoints: (builder) => ({
    postCreateSubject: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostCreateSubjectMutation } = subjectsApiSlice;
