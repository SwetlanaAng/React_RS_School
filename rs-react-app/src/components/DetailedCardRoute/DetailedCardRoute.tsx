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
      <div className="mx-3 my-4 self-start rounded-2xl border-2 border-teal-200 bg-white p-6 shadow-lg shadow-teal-100">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="mx-3 my-4 self-start rounded-2xl border-2 border-teal-200 bg-white p-6 shadow-lg shadow-teal-100">
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
