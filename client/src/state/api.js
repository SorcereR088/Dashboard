import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), // Use import.meta.env for Vite
  reducerPath: 'adminApi',
  tagTypes: ['User','Users', 'Property', 'Transactions'],

  endpoints: (build) => ({

    getUser: build.query({
      query: (id) => `/user/${id}`,
      provideTags: ['User'],
    }),

    getUsers: build.query({
      query: () => `/user`,
      provideTags: ['Users'],
    }),
    
    getProperty: build.query({
      query: () => "/property",
      provideTags: ["Property"]
    }),
    
    getTransactions: build.query({
      query: () => `/transactions`,
      providesTags: ["Transactions"]
    })
  }),
});

export const { useGetUserQuery, useGetPropertyQuery, useGetUsersQuery, useGetTransactionsQuery} = api;
