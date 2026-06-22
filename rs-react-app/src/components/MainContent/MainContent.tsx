import CardsBox from '@/components/CardsBox/CardsBox';
import { getCharacters } from '@/shared/getCharacters';
import ErrorUI from '@/components/ErrorUI/ErrorUI';

export async function MainContent({
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
    <section className="min-w-0 flex-1">
      <CardsBox characters={data.data.results} />
    </section>
  );
}
