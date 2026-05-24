import { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Button from '../components/Button/Button';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { MainContent } from '../components/MainContent/MainContent';
import ErrorUI from '../components/ErrorUI/ErrorUI';
import { useAppData } from '../hooks/useAppData';
import Pagination from '../components/Pagination/Pagination';
import { Outlet } from 'react-router';
import { Flyout } from '../components/Flyout/Flyout';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function Home() {
  const charactersSelected = useSelector(
    (state: RootState) => state.characters.selected.length
  );
  const {
    search,
    characters,
    loading,
    searchFailed,
    onFormSubmit,
    paginationData,
    currentPaginationPage,
  } = useAppData();
  const [error, setError] = useState<boolean>(false);

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
          {!loading && !searchFailed && (
            <Pagination
              currentPage={currentPaginationPage}
              count={paginationData.count}
              pages={paginationData.pages}
              next={paginationData.next}
              prev={paginationData.prev}
            />
          )}
          {searchFailed ? (
            <ErrorUI errorMessage="There is no matching characters or an error has occurred(4xx or 5xx)"></ErrorUI>
          ) : (
            <div className="flex items-start">
              <MainContent loading={loading} characters={characters} />
              <Outlet context={{ characters }} />
            </div>
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
        {charactersSelected > 0 && (
          <Flyout charactersSelected={charactersSelected}></Flyout>
        )}
      </ErrorBoundary>
    </>
  );
}
