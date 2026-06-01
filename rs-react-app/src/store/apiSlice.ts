import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character, ResponseCharacter } from '../shared/types';
interface GetCharactersArgs {
  search?: string;
  page?: number;
}
interface GetOneCharacterArgs {
  id: number;
}
const BASE_URL = 'https://rickandmortyapi.com/api';
export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  tagTypes: ['Characters', 'DetailedCharacter'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: Number(import.meta.env.VITE_CACHE_TTL) || 60,
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
      providesTags: ['Characters'],
    }),
    getOneCharacter: builder.query<Character, GetOneCharacterArgs>({
      query: ({ id }) => `/character/${String(id)}`,
      providesTags: ['DetailedCharacter'],
    }),
    refetchCharacters: builder.mutation({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: ['Characters', 'DetailedCharacter'],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetOneCharacterQuery,
  useRefetchCharactersMutation,
} = charactersApi;
