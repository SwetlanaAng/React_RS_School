import DetailedCardServer from '@/components/DetailedCardServer/DetailedCardServer';
import { MainContent } from '../components/MainContent/MainContent';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { PaginationServer } from '@/components/Pagination/PaginationServer';
import PaginationSkeleton from '@/components/Pagination/PaginationSkeleton';
import SearchForm from '@/components/SearchForm/SearchForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';
import { Flyout } from '@/components/Flyout/Flyout';
import { HomeWrapper } from '@/components/HomeWrapper/HomeWrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    details?: string;
    name?: string;
  }>;
}) {
  const params = await searchParams;

  if (!params.name) {
    const storedSearch = (await cookies()).get(SEARCH_STORAGE_KEY)?.value;
    if (storedSearch) {
      const query = new URLSearchParams({ name: storedSearch });
      if (params.page) query.set('page', params.page);
      if (params.details) query.set('details', params.details);
      redirect(`/?${query.toString()}`);
    }
  }

  const page = Number(params.page ?? 1);
  const id = params.details ? Number(params.details) : null;
  const search = params.name ?? '';

  return (
    <>
      <HomeWrapper>
        <SearchForm />
        <main>
          <Suspense fallback={<PaginationSkeleton />}>
            <PaginationServer page={page} search={search} />
          </Suspense>
          <div className="flex items-start">
            <Suspense fallback={<Spinner />}>
              <MainContent page={page} search={search} />
            </Suspense>

            <Suspense fallback={<Spinner />}>
              <DetailedCardServer detailsId={id}></DetailedCardServer>
            </Suspense>
          </div>
        </main>
        <Flyout></Flyout>
      </HomeWrapper>
    </>
  );
}
