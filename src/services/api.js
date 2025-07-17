import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust if your API is elsewhere
  tagTypes: ['Post', 'User', 'DBStatus'], // Define tags for caching
  endpoints: (builder) => ({
    getDbStatus: builder.query({
      query: () => 'test-connection',
      providesTags: ['DBStatus'],
    }),
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
        query: (id) => `posts/${id}`,
        providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    // Add mutations for creating, updating, deleting data
    // e.g. addPost: builder.mutation(...)
  }),
});

export const { useGetDbStatusQuery, useGetPostsQuery, useGetPostQuery } = api;
