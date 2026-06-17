'use client';
import Link from 'next/link';
import logo from '../assets/morty-smith.png';
import light from '../assets/light.png';
import dark from '../assets/dark.png';
import reload from '../assets/reload.png';
import { useTheme } from '../hooks/useTheme';
import { useRefetchCharactersMutation } from '../store/apiSlice';
import Image from 'next/image';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [refetchCharacters] = useRefetchCharactersMutation();

  const handleReload = () => {
    void refetchCharacters(undefined);
  };

  return (
    <header className="relative sticky top-0 z-20 flex items-center justify-between bg-teal-100 px-5 py-3 text-teal-800 shadow-sm transition-colors duration-300 dark:bg-slate-950 dark:text-teal-100 dark:shadow-teal-950">
      <Link href="/" className="">
        <Image src={logo} alt="Morty" className="h-12 w-auto object-contain" />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/about"
          className="font-bold transition-colors hover:text-purple-700 dark:hover:text-fuchsia-300"
        >
          About
        </Link>
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
          <Image
            src={theme === 'light' ? dark : light}
            alt="Sun"
            className="h-8 w-auto cursor-pointer object-contain"
          />
        </button>
      </div>
      <button
        type="button"
        onClick={handleReload}
        aria-label="Cache invalidation and refetch characters"
        className="absolute top-full right-4 z-30 mt-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-teal-300 bg-white p-1.5 shadow-md transition-all duration-200 hover:scale-105 hover:border-purple-300 hover:bg-teal-50 hover:shadow-lg active:scale-95 dark:border-teal-400 dark:bg-slate-900 dark:hover:border-fuchsia-400 dark:hover:bg-slate-800"
      >
        <Image
          src={reload}
          alt=""
          className="h-6 w-6 object-contain"
          aria-hidden
        />
      </button>
    </header>
  );
}
