import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Use import.meta.env for Vite
  reducerPath: 'adminApi',
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/user/${id}`,
      provideTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery } = api;
