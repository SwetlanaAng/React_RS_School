import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, ResponseCharacter } from '../shared/types';
interface GetCharactersArgs {
  search?: string;
  page?: number;
}
interface GetOneCharacterArgs {
  id: number;
}
export const BASE_URL = 'https://rickandmortyapi.com/api';
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getCharacters: builder.query<ResponseCharacter, GetCharactersArgs>({
      query: ({ search, page }) => {
        let url = `/character`;
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
    getOneCharacter: builder.query<Character, GetOneCharacterArgs>({
      query: ({ id }) => `/character/${String(id)}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetOneCharacterQuery } = charactersApi;
