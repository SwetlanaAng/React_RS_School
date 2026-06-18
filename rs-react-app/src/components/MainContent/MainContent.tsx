import CardsBox from '../CardsBox/CardsBox';
import { getCharacters } from '@/shared/getCharacters';

export async function MainContent({ page }: { page: number }) {
  const data = await getCharacters(page);
  return (
    <section className="min-w-0 flex-1">
      <CardsBox characters={data.results} />
    </section>
  );
}
