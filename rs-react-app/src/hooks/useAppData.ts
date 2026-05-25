import { useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import type { Character, Info, ResponseCharacter } from '../shared/types';
import { getCharacters } from '../services/apiService/apiService';
import { useSearchParams } from 'react-router';

export function useAppData() {
  const { saveSearch } = useStorage();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<Info>({
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('name') ?? '';
  const currentPaginationPage = Number(searchParams.get('page') ?? 1);

  function onFormSubmit(string: string) {
    saveSearch(string);
    if (string) {
      setSearchParams({ name: string, page: '1' });
    } else {
      setSearchParams({ page: '1' });
    }
  }

  useEffect(() => {
    async function updateData() {
      setLoading(true);
      try {
        const res: ResponseCharacter = await getCharacters(
          search,
          currentPaginationPage
        );
        setCharacters(res.results);
        setPaginationData(res.info);
        setSearchFailed(false);
      } catch {
        setSearchFailed(true);
      } finally {
        setLoading(false);
      }
    }
    void updateData();
  }, [search, currentPaginationPage]);
  return {
    search,
    characters,
    loading,
    searchFailed,
    onFormSubmit,
    paginationData,
    currentPaginationPage,
  };
}
