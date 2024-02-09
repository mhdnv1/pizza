// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Укажите базовый URL вашего сервера
  endpoints: (builder) => ({
    updateUserCart: builder.mutation({
      query: ({ userId, cart }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: { cart },
      }),
    }),
  }),
});

export const { useUpdateUserCartMutation } = api;
