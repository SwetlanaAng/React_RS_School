import { useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import type { Character, Info, ResponseCharacter } from '../shared/types';
import { getCharacters } from '../services/apiService/apiService';
import { useSearchParams } from 'react-router';

export function useAppData() {
  const [, setSearchParams] = useSearchParams();
  const { saveSearch, getSearch } = useStorage();
  const [search, setSearch] = useState(getSearch() ?? '');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<Info>({
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  });
  const [currentPaginationPage, setCurrentPaginationPage] = useState<number>(1);

  function onFormSubmit(string: string) {
    setSearch(string);
    setCurrentPaginationPage(1);
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
    setCurrentPaginationPage,
  };
}
