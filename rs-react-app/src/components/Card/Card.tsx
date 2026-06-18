'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCharacter } from '../../store/charactersSlice';
import type { Character } from '../../shared/types';
import type { AppDispatch, RootState } from '../../store/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  character: Character;
}

export default function Card({ character }: CardProps) {
  const { id, image, name } = character;

  const dispatch = useDispatch<AppDispatch>();

  const isSelected = useSelector((state: RootState) =>
    state.characters.selected.some((item) => {
      return item.id === id;
    })
  );

  const handleSelect = () => {
    dispatch(toggleCharacter(character));
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        if (!searchParams) return;
        const params = new URLSearchParams(searchParams.toString());

        params.set('details', String(id));
        if (pathname) router.push(`${pathname}?${params.toString()}`);
      }}
      className={`relative h-60 w-32 overflow-hidden rounded border-2 border-purple-200 bg-white text-teal-900 shadow-lg transition-colors duration-300  dark:border-purple-800 dark:bg-slate-900 dark:text-teal-50 dark:shadow-purple-950 sm:h-[450px] sm:w-auto sm:max-w-sm ${
        isSelected ? 'ring-4 ring-fuchsia-400' : ''
      }`}
    >
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="w-full"
      />
      <div className="px-6 py-4 text-center">
        <div className="mb-2 text-sm font-bold sm:w-[300px] sm:text-xl">
          {name}
        </div>
        <label
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-purple-300 bg-white/80 shadow-sm transition-colors hover:bg-purple-100 dark:border-purple-700 dark:bg-slate-900/80"
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            aria-label={`Select ${name}`}
            className="sr-only"
          />
          <span
            className={`h-4 w-4 rounded-full border-2 transition-colors ${
              isSelected
                ? 'border-fuchsia-600 bg-fuchsia-500'
                : 'border-teal-500 bg-transparent'
            }`}
          />
        </label>
      </div>
    </div>
  );
}
