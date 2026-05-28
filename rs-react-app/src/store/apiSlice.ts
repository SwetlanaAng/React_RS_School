import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL = 'https://rickandmortyapi.com/api';
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: (search?: string, page?: number, id?: number) => {
        let url = `/character${id ? '/' + String(id) : ''}`;
        if (search || page) url += '?';
        if (search) {
          url += `name=${search}`;
        }
        if (page) {
          url += `${search ? '&' : ''}page=${String(page)}`;
        }
        return url;
      },
    }),
    getOneCharacter: builder.query({
      query: (id: number) => `/character/${String(id)}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetOneCharacterQuery } = charactersApi;
