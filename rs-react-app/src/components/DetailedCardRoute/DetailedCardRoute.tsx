import { useSearchParams } from 'react-router';
import type { Character } from '../../shared/types';
import DetailedCard from '../DetailedCard/DetailedCard';
import { getOneCharacter } from '../../services/apiService/apiService';
import Spinner from '../Spinner/Spinner';
import { useEffect, useState } from 'react';

export default function DetailedCardRoute() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsId = Number(searchParams.get('details'));
  useEffect(() => {
    if (!detailsId) {
      return;
    }
    async function loadCharacter() {
      try {
        const character = await getOneCharacter(detailsId);

        setCharacter(character);
      } catch (error) {
        console.error(error);
      }
    }
    void loadCharacter();
  }, [detailsId]);
  if (!detailsId) {
    return null;
  }
  if (character?.id !== detailsId) {
    return (
      <div className="mx-1 my-4 flex min-h-60 w-40 shrink-0 items-center justify-center self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:min-h-[450px] sm:w-96 sm:p-6">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="mx-1 my-4 w-40 shrink-0 self-start rounded-2xl border-2 border-teal-200 bg-white p-2 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-800 dark:shadow-teal-950 sm:mx-3 sm:w-auto sm:p-6">
      <DetailedCard
        {...character}
        onClose={() => {
          searchParams.delete('details');
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}
