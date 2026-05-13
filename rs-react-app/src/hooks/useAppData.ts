import { useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import type { Character } from '../shared/types';
import { getCharacters } from '../services/apiService/apiService';

export function useAppData() {
  const { saveSearch, getSearch } = useStorage();
  const [search, setSearch] = useState(getSearch() ?? '');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);

  function onFormSubmit(string: string) {
    setSearch(string);
    saveSearch(string);
  }

  useEffect(() => {
    async function updateData() {
      setLoading(true);
      try {
        const res: Character[] = await getCharacters(search);
        setCharacters(res);
        setSearchFailed(false);
      } catch {
        setSearchFailed(true);
      } finally {
        setLoading(false);
      }
    }
    void updateData();
  }, [search]);
  return {
    search,
    characters,
    loading,
    searchFailed,
    onFormSubmit,
  };
}
