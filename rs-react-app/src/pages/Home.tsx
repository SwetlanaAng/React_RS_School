import { useEffect, useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Button from '../components/Button/Button';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { MainContent } from '../components/MainContent/MainContent';
import ErrorUI from '../components/ErrorUI/ErrorUI';
import { useAppData } from '../hooks/useAppData';
import Pagination from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router';

export default function Home() {
  const {
    search,
    characters,
    loading,
    searchFailed,
    onFormSubmit,
    paginationData,
    currentPaginationPage,
    setCurrentPaginationPage,
  } = useAppData();
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  useEffect(() => {
    if (currentPage) setCurrentPaginationPage(Number(currentPage));
  }, [currentPage, setCurrentPaginationPage]);
  return (
    <>
      <ErrorBoundary errorSwitcher={setError}>
        <SearchForm
          error={error}
          loading={loading}
          onSubmit={onFormSubmit}
          search={search}
        />
        <main>
          {searchFailed ? (
            <ErrorUI errorMessage="There is no matching characters or an error has occurred(4xx or 5xx)"></ErrorUI>
          ) : (
            <MainContent
              loading={loading}
              characters={characters}
            ></MainContent>
          )}
          {!loading && !searchFailed && (
            <Pagination
              currentPage={currentPaginationPage}
              setPage={setCurrentPaginationPage}
              count={paginationData.count}
              pages={paginationData.pages}
              next={paginationData.next}
              prev={paginationData.prev}
            />
          )}
        </main>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              setError(true);
            }}
            type="button"
            className="mb-6"
          >
            Error Button
          </Button>
        </div>
      </ErrorBoundary>
    </>
  );
}
