import { useStorage } from './useStorage';
import { useSearchParams } from 'react-router';
import { useGetCharactersQuery } from '../store/apiSlice';

export function useAppData() {
  const { saveSearch } = useStorage();
  /*  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<Info>({
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  }); */
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('name') ?? ''; // тут добавить получение из локал ст
  const currentPaginationPage = Number(searchParams.get('page') ?? 1);

  function onFormSubmit(string: string) {
    saveSearch(string);
    if (string) {
      setSearchParams({ name: string, page: '1' });
    } else {
      setSearchParams({ page: '1' });
    }
  }
  const { data, isError, isLoading } = useGetCharactersQuery({
    search,
    page: currentPaginationPage,
  });

  /* useEffect(() => {
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
  }, [search, currentPaginationPage]); */
  return {
    search,
    characters: data?.results ?? [],
    loading: isLoading,
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
