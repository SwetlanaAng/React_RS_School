import { useState } from 'react';
import type { Character } from '../../shared/types';
import Card from '../Card/Card';
import DetailedCard from '../DetailedCard/DetailedCard';
interface CardsBoxProps {
  characters: Character[];
}
export default function CardsBox({ characters }: CardsBoxProps) {
  const [chosenCharacter, setChosenCharacter] = useState<number | null>(null);
  const selectedCharacter = characters.find(
    (item) => item.id === chosenCharacter
  );
  return (
    <div className="flex   items-start">
      {' '}
      <div
        className="mx-3 my-4   rounded-2xl border-2 border-teal-200 bg-white 
      p-6 shadow-lg shadow-teal-100"
      >
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {characters.map((character) => (
            <div key={character.id}>
              <Card {...character} setChosenCharacter={setChosenCharacter} />
            </div>
          ))}
        </div>
      </div>
      {selectedCharacter && (
        <div
          className="mx-3 my-4 rounded-2xl border-2 border-teal-200 bg-white 
    p-6 shadow-lg shadow-teal-100"
        >
          <DetailedCard {...selectedCharacter} />
        </div>
      )}
    </div>
  );
}
