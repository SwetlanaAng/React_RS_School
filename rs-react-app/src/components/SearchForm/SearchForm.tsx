'use client';

import { useActionState } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useStorage } from '@/hooks/useStorage';
import { useTranslations } from 'next-intl';
import { searchAction } from '@/app/actions/searchActions';

export interface SearchFormProps {
  className?: string;
}

export default function SearchForm({ className }: SearchFormProps) {
  const searchParams = useSearchParams();
  const { saveSearch } = useStorage();
  const t = useTranslations('search');
  const nameFromUrl = searchParams.get('name') ?? '';
  const [, formAction, isPending] = useActionState(searchAction, null);

  return (
    <div className="flex items-center justify-center px-4 my-4">
      <form
        action={formAction}
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget);
          const searchValue = formData.get('search');
          const search =
            typeof searchValue === 'string' ? searchValue.trim() : '';
          saveSearch(search);
        }}
        className={`flex w-full max-w-xl items-center gap-5 rounded-2xl 
            border border-teal-200 bg-white p-6 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-900 dark:shadow-teal-950 ${className ?? ''}`}
      >
        <div className="relative flex-1">
          <Input
            key={nameFromUrl}
            className="w-full rounded-xl border-2 border-teal-300 bg-fuchsia-50 py-3 pl-11 pr-4
               text-teal-700 outline-none transition-colors duration-300 placeholder:text-teal-300 
               focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:border-teal-700 dark:bg-slate-950
               dark:text-teal-100 dark:placeholder:text-teal-600 dark:focus:border-fuchsia-500 dark:focus:ring-purple-950"
            type="search"
            defaultValue={nameFromUrl}
            placeholder={t('placeholder')}
            name="search"
            id="search"
          />
          <Image
            src="/search.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 block h-5 w-5 -translate-y-1/2 text-teal-400 dark:text-teal-500"
          />
        </div>
        <Button type="submit" loading={isPending}>
          {t('submit')}
        </Button>
      </form>
    </div>
  );
}
