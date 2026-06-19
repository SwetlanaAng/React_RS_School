import { getCharacters } from '@/shared/getCharacters';
import Pagination from './Pagination';
import ErrorUI from '../ErrorUI/ErrorUI';

export async function PaginationServer({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const data = await getCharacters(search, page);

  if (!data.ok) {
    return (
      <section className="min-w-0 flex-1">
        <ErrorUI errorMessage={data.error} />
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
