import { useOutletContext, useSearchParams } from 'react-router';
import type { Character } from '../../shared/types';
import DetailedCard from '../DetailedCard/DetailedCard';

export default function DetailedCardRoute() {
  const { characters } = useOutletContext<{ characters: Character[] }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsId = Number(searchParams.get('details'));
  const selectedCharacter = characters.find(({ id }) => id === detailsId);

  if (!selectedCharacter) {
    return null;
  }

  return (
    <div className="mx-3 my-4 self-start rounded-2xl border-2 border-teal-200 bg-white p-6 shadow-lg shadow-teal-100">
      <DetailedCard
        {...selectedCharacter}
        onClose={() => {
          searchParams.delete('details');
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}
