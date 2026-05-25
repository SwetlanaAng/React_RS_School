import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchSVG from '../../assets/search.svg';
export interface SearchFormProps {
  className?: string;
  onSubmit: (string: string) => void;
  loading?: boolean;
  error: boolean;
  search: string;
}
export default function SearchForm({
  error,
  search,
  className,
  onSubmit,
  loading,
}: SearchFormProps) {
  const [inputValue, setInputValue] = useState(search);

  if (error) {
    throw new Error('ErrorBoundary test error');
  }
  return (
    <div className="flex items-center justify-center px-4 my-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const searchValue = formData.get('search');
          const search =
            typeof searchValue === 'string' ? searchValue.trim() : '';
          onSubmit(search);
        }}
        className={`flex w-full max-w-xl items-center gap-5 rounded-2xl 
            border border-teal-200 bg-white p-6 shadow-lg shadow-teal-100 transition-colors duration-300 dark:border-teal-800 dark:bg-slate-900 dark:shadow-teal-950 ${className ?? ''}`}
      >
        <div className="relative flex-1">
          <Input
            className="w-full rounded-xl border-2 border-teal-300 bg-fuchsia-50 py-3 pl-11 pr-4
               text-teal-700 outline-none transition-colors duration-300 placeholder:text-teal-300 
               focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:border-teal-700 dark:bg-slate-950
               dark:text-teal-100 dark:placeholder:text-teal-600 dark:focus:border-fuchsia-500 dark:focus:ring-purple-950"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(event.target.value);
            }}
            type="search"
            value={inputValue}
            placeholder="Search..."
            name="search"
            id="search"
          />
          <img
            src={searchSVG}
            alt="spinner"
            className="block pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-400 dark:text-teal-500"
          />
        </div>
        <Button type="submit" loading={loading}>
          Search
        </Button>
      </form>
    </div>
  );
}
