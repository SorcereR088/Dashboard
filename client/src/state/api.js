import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Use import.meta.env for Vite
  reducerPath: 'adminApi',
  tagTypes: ['User', 'Property'],

  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `/user/${id}`,
      provideTags: ['User'],
    }),
    
    getProperty: build.query({
      query: () => "/property",
      provideTags: ["Property"]
    }),
  }),
});

export const { useGetUserQuery, useGetPropertyQuery } = api;
