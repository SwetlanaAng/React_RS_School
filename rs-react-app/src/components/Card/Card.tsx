import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { toggleCharacter } from '../../store/charactersSlice';
import type { Character } from '../../shared/types';
import type { AppDispatch, RootState } from '../../store/store';
interface CardProps {
  character: Character;
}
export default function Card({ character }: CardProps) {
  const { id, image, name } = character;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const isSelected = useSelector((state: RootState) =>
    state.characters.selected.some((item) => {
      return item.id === id;
    })
  );
  const handleSelect = () => {
    dispatch(toggleCharacter(character));
  };
  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        const currentSearch = searchParams.get('name');
        const currentPage = searchParams.get('page');
        if (currentSearch && currentPage) {
          setSearchParams({
            name: currentSearch,
            page: currentPage,
            details: String(id),
          });
        } else {
          setSearchParams({
            page: currentPage ?? '1',
            details: String(id),
          });
        }
      }}
      className="h-60 w-32 overflow-hidden rounded border-2 border-purple-200 bg-white text-teal-900 shadow-lg transition-colors duration-300  dark:border-purple-800 dark:bg-slate-900 dark:text-teal-50 dark:shadow-purple-950 sm:h-[450px] sm:w-auto sm:max-w-sm"
    >
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="mb-2 text-sm font-bold sm:w-[300px] sm:text-xl">
          {name}
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onChange={handleSelect}
          aria-label={`Select ${name}`}
        />
      </div>
    </div>
  );
}
