import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:3000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: (page) => "?page=" + page,
      providesTags: ["Images"],
    }),
    likeImage: builder.mutation({
      query: (body) => ({
        url: "",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const { useGetImagesQuery, useLikeImageMutation } = api;
