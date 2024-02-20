const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");

export const subjectsApiSlice = createApi({
  reducerPath: "subjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/subjects" }),
  endpoints: (builder) => ({
    getAllSubjects: builder.query({
      query: () => ({
        url: "",
      }),
    }),
    getSubjectById: builder.query({
      query: (subjectId) => ({
        url: `/${subjectId}`,
      }),
    }),
    postCreateSubject: builder.mutation({
      query: ({ ...body }) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    updateSubjectsOrder: builder.mutation({
      query: ({ ...body }) => ({
        url: "/order",
        method: "PUT",
        body,
      }),
    }),
    updateCategoriesOrder: builder.mutation({
      query: ({ subjectId, ...body }) => ({
        url: `/${subjectId}/order`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSubjectsQuery,
  useLazyGetSubjectByIdQuery,
  usePostCreateSubjectMutation,
  useUpdateSubjectsOrderMutation,
  useUpdateCategoriesOrderMutation,
} = subjectsApiSlice;
