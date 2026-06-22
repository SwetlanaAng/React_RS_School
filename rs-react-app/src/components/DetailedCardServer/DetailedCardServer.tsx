import DetailedCard from '@/components/DetailedCard/DetailedCard';
import ErrorUI from '@/components/ErrorUI/ErrorUI';
import { isCharacter } from '@/utils/typeGuards';
import { getTranslations } from 'next-intl/server';

export default async function DetailedCardServer({
  detailsId,
}: {
  detailsId: number | null;
}) {
  if (!detailsId) {
    return null;
  }

  const t = await getTranslations('errors');

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${String(detailsId)}`,
    {
      cache: 'force-cache',
      next: { revalidate: Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60 },
    }
  );

  const errorWrapperClassName =
    'mx-1 my-4 flex min-h-60 w-40 shrink-0 items-center justify-center self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:min-h-[450px] sm:w-96 sm:p-6';

  if (!res.ok) {
    return (
      <div className={errorWrapperClassName}>
        <ErrorUI errorMessage={t('characterNotFound')} />
      </div>
    );
  }

  const character: unknown = await res.json();

  if (!isCharacter(character)) {
    return (
      <div className={errorWrapperClassName}>
        <ErrorUI errorMessage={t('characterNotFound')} />
      </div>
    );
  }

  return (
    <div className="mx-1 my-4 w-40 shrink-0 self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:w-auto sm:p-6">
      <DetailedCard {...character} />
    </div>
  );
}
