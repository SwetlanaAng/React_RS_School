import type { Character } from '../../shared/types';
import Card from '../Card/Card';
import { useSearchParams } from 'react-router';
interface CardsBoxProps {
  characters: Character[];
}
export default function CardsBox({ characters }: CardsBoxProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex   items-start">
      {' '}
      <div
        onClick={() => {
          searchParams.delete('details');
          setSearchParams(searchParams);
        }}
        className="mx-3 my-4   rounded-2xl border-2 border-teal-200 bg-white 
      p-6 shadow-lg shadow-teal-100"
      >
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {characters.map((character) => (
            <div key={character.id}>
              <Card {...character} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
