import { getCharacters } from '@/shared/getCharacters';
import Pagination from './Pagination';
import ErrorUI from '@/components/ErrorUI/ErrorUI';
import { getTranslations } from 'next-intl/server';

export async function PaginationServer({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const t = await getTranslations('errors');
  const data = await getCharacters(search, page);

  if (!data.ok) {
    return (
      <section className="min-w-0 flex-1">
        <ErrorUI errorMessage={t(data.error)} />
      </section>
    );
  }

  return (
    <Pagination
      currentPage={page}
      count={data.data.info.count}
      pages={data.data.info.pages}
      next={data.data.info.next}
      prev={data.data.info.prev}
    />
  );
}
