'use client';
//import { useSearchParams } from 'react-router';
import type { Info } from '../../shared/types';

interface PaginationProps extends Info {
  currentPage: number;
}

export default function Pagination({
  prev,
  next,
  pages,
  currentPage,
}: PaginationProps) {
  //const [searchParams, setSearchParams] = useSearchParams();

  const buttons: number[] = [];

  if (pages <= 5) {
    for (let i = 1; i <= pages; i++) {
      buttons.push(i);
    }
  } else {
    buttons.push(1);
    buttons.push(2);

    if (currentPage > 3) {
      buttons.push(0);
    }

    const start = Math.max(3, currentPage - 1);
    const end = Math.min(pages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }

    if (currentPage < pages - 2) {
      buttons.push(0);
    }

    buttons.push(pages);
  }

  const paginationButtonClassName =
    'flex h-10 w-10 items-center justify-center rounded-lg border-2 border-teal-300 font-bold shadow-sm transition-colors hover:bg-purple-300 hover:text-teal-800 dark:border-teal-700 dark:hover:bg-purple-900 dark:hover:text-teal-100';
  const paginationArrowClassName =
    'flex h-10 min-w-16 items-center justify-center rounded-lg border-2 border-teal-300 bg-white px-3 font-bold text-teal-700 shadow-sm transition-colors hover:bg-purple-300 hover:text-teal-800 dark:border-teal-700 dark:bg-slate-900 dark:text-teal-100 dark:hover:bg-purple-900 dark:hover:text-teal-100';
  const activeButtonClassName =
    'bg-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-800 dark:text-fuchsia-100';
  const defaultButtonClassName =
    'bg-white text-teal-700 dark:bg-slate-900 dark:text-teal-100';

  return (
    <div
      onClick={() => {
        //searchParams.delete('details');
        //setSearchParams(searchParams);
      }}
      className="py-8 flex items-center justify-center gap-2 text-teal-700 dark:text-teal-200"
    >
      {prev && (
        <button
          type="button"
          className={paginationArrowClassName}
          onClick={(event) => {
            event.stopPropagation();
            //const currentSearch = searchParams.get('name');

            /* if (currentSearch) {
              setSearchParams({
                name: currentSearch,
                page: String(currentPage - 1),
              });
            } else {
              setSearchParams({ page: String(currentPage - 1) });
            } */
          }}
        >
          prev
        </button>
      )}
      {buttons.map((item) => {
        if (item === 0) return <span key={item}>...</span>;

        return (
          <button
            type="button"
            className={`${paginationButtonClassName} ${
              currentPage === item
                ? activeButtonClassName
                : defaultButtonClassName
            }`}
            key={item}
            onClick={(event) => {
              event.stopPropagation();
              /* const currentSearch = searchParams.get('name');

              if (currentSearch) {
                setSearchParams({ name: currentSearch, page: String(item) });
              } else {
                setSearchParams({ page: String(item) });
              } */
            }}
          >
            {item}
          </button>
        );
      })}
      {next && (
        <button
          type="button"
          className={paginationArrowClassName}
          onClick={(event) => {
            event.stopPropagation();
            /* const currentSearch = searchParams.get('name');

            if (currentSearch) {
              setSearchParams({
                name: currentSearch,
                page: String(currentPage + 1),
              });
            } else {
              setSearchParams({ page: String(currentPage + 1) });
            } */
          }}
        >
          next
        </button>
      )}
    </div>
  );
}
