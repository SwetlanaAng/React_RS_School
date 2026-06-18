import DetailedCard from '../DetailedCard/DetailedCard';
import ErrorUI from '../ErrorUI/ErrorUI';
import { isCharacter } from '@/utils/typeGuards';

export default async function DetailedCardServer({
  detailsId,
}: {
  detailsId: number | null;
}) {
  if (!detailsId) {
    return null;
  }
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${String(detailsId)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return (
      <div className="mx-1 my-4 flex min-h-60 w-40 shrink-0 items-center justify-center self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:min-h-[450px] sm:w-96 sm:p-6">
        <ErrorUI errorMessage="There is no character or an error has occurred(4xx or 5xx)"></ErrorUI>
      </div>
    );
  }

  const character: unknown = await res.json();
  if (!isCharacter(character)) return null;
  return (
    <div className="mx-1 my-4 w-40 shrink-0 self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:w-auto sm:p-6">
      <DetailedCard {...character} />
    </div>
  );
}
