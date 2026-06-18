import DetailedCardServer from '@/components/DetailedCardServer/DetailedCardServer';
import { MainContent } from '../components/MainContent/MainContent';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { PaginationServer } from '@/components/Pagination/PaginationServer';
import PaginationSkeleton from '@/components/Pagination/PaginationSkeleton';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    details?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const id = params.details ? Number(params.details) : null;

  return (
    <>
      <main>
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationServer page={page} />
        </Suspense>
        <div className="flex items-start">
          <Suspense fallback={<Spinner />}>
            <MainContent page={page} />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <DetailedCardServer detailsId={id}></DetailedCardServer>
          </Suspense>
        </div>
      </main>

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
