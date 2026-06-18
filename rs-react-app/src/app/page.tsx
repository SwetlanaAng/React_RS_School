//import { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Button from '../components/Button/Button';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { MainContent } from '../components/MainContent/MainContent';
import ErrorUI from '../components/ErrorUI/ErrorUI';
//import { useAppData } from '../hooks/useAppData';
import Pagination from '../components/Pagination/Pagination';
import { Outlet } from 'react-router';
import { Flyout } from '../components/Flyout/Flyout';
import { isResponseCharacter } from '@/utils/typeGuards';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    details?: string;
  }>;
}) {
  /*   const {
    search,
    characters,
    loading,
    searchFailed,
    onFormSubmit,
    paginationData,
    currentPaginationPage,
  } = useAppData();

  const [error, setError] = useState<boolean>(false); */

  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${String(page)}`,
    {
      cache: 'no-store',
    }
  );

  const data: unknown = await response.json();
  if (!isResponseCharacter(data)) {
    throw new Error('Invalid API response');
  }
  return (
    <>
      <Pagination
        currentPage={page}
        count={data.info.count}
        pages={data.info.pages}
        next={data.info.next}
        prev={data.info.prev}
      />
      <div className="flex items-start">
        <MainContent loading={false} characters={data.results} />
      </div>
      {/* <ErrorBoundary errorSwitcher={setError}> */}
      {/*  <SearchForm
          error={error}
          loading={loading}
          onSubmit={onFormSubmit}
          search={search}
        /> */}
      {/*  <main>
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
        <Flyout></Flyout> */}
      {/* </ErrorBoundary> */}
    </>
  );
}
