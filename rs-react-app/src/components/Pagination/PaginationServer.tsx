import { getCharacters } from '@/shared/getCharacters';
import Pagination from './Pagination';

export async function PaginationServer({ page }: { page: number }) {
  const data = await getCharacters(page);
  return (
    <Pagination
      currentPage={page}
      count={data.info.count}
      pages={data.info.pages}
      next={data.info.next}
      prev={data.info.prev}
    />
  );
}
