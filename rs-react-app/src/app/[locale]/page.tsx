import DetailedCardServer from '@/components/DetailedCardServer/DetailedCardServer';
import { MainContent } from '@/components/MainContent/MainContent';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';
import { PaginationServer } from '@/components/Pagination/PaginationServer';
import PaginationSkeleton from '@/components/Pagination/PaginationSkeleton';
import SearchForm from '@/components/SearchForm/SearchForm';
import { cookies } from 'next/headers';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';
import { Flyout } from '@/components/Flyout/Flyout';
import { HomeWrapper } from '@/components/HomeWrapper/HomeWrapper';
import { redirect } from '@/i18n/routing';
import { getValidLocale } from '@/i18n/locale';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    details?: string;
    name?: string;
  }>;
}

export default async function Home({ params, searchParams }: Props) {
  const { locale } = await params;

  const routeParams = await searchParams;

  if (!routeParams.name) {
    const storedSearch = (await cookies()).get(SEARCH_STORAGE_KEY)?.value;

    if (storedSearch) {
      const query: Record<string, string> = { name: storedSearch };

      if (routeParams.page) query.page = routeParams.page;
      if (routeParams.details) query.details = routeParams.details;

      redirect({
        href: { pathname: '/', query },
        locale: getValidLocale(locale),
      });
    }
  }

  const page = Number(routeParams.page ?? 1);

  const id = routeParams.details ? Number(routeParams.details) : null;

  const search = routeParams.name ?? '';

  return (
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
            <DetailedCardServer detailsId={id} />
          </Suspense>
        </div>
      </main>
      <Flyout />
    </HomeWrapper>
  );
}
