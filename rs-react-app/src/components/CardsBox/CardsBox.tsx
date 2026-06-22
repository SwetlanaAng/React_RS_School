'use client';

import type { Character } from '@/shared/types';
import Card from '@/components/Card/Card';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

interface CardsBoxProps {
  characters: Character[];
}

export default function CardsBox({ characters }: CardsBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex   items-start">
      {' '}
      <div
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete('details');
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="mx-1 my-4 rounded-2xl border-2 border-teal-200 bg-white 
      p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {characters.map((character) => (
            <div key={character.id}>
              <Card character={character} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
