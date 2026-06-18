import CardsBox from '../CardsBox/CardsBox';
import { getCharacters } from '@/shared/getCharacters';
import ErrorUI from '../ErrorUI/ErrorUI';

export async function MainContent({ page }: { page: number }) {
  const data = await getCharacters(page);

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
