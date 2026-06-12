import { useStorage } from './useStorage';
import { useSearchParams } from 'react-router';
import { useGetCharactersQuery } from '../store/apiSlice';

export function useAppData() {
  const { saveSearch, getSearch } = useStorage();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('name') ?? getSearch() ?? '';
  const currentPaginationPage = Number(searchParams.get('page') ?? 1);

  function onFormSubmit(string: string) {
    saveSearch(string);

    if (string) {
      setSearchParams({ name: string, page: '1' });
    } else {
      setSearchParams({ page: '1' });
    }
  }

  const { data, isError, isLoading, isFetching } = useGetCharactersQuery({
    search,
    page: currentPaginationPage,
  });

  return {
    search,
    characters: data?.results ?? [],
    loading: isLoading || isFetching,
    searchFailed: isError,
    onFormSubmit,
    paginationData: data?.info ?? {
      count: 0,
      pages: 0,
      next: '',
      prev: '',
    },
    currentPaginationPage,
  };
}
