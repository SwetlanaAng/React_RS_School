import type { Info } from '../../shared/types';

export default function Pagination({ prev, next, pages }: Info) {
  const paginationButtonClassName =
    'flex h-10 w-10 items-center justify-center rounded-lg border-2 border-teal-300 bg-white font-bold text-teal-700 shadow-sm transition-colors hover:bg-purple-300 hover:text-teal-800';
  const paginationArrowClassName =
    'flex h-10 min-w-16 items-center justify-center rounded-lg border-2 border-teal-300 bg-white px-3 font-bold text-teal-700 shadow-sm transition-colors hover:bg-purple-300 hover:text-teal-800';
  let one = false;
  let two = false;
  let three = false;
  let many = false;
  switch (pages) {
    case 1:
      one = true;
      break;
    case 2:
      two = true;
      break;
    case 3:
      three = true;
      break;
    default:
      many = true;
  }
  return (
    <div className="my-8 flex items-center justify-center gap-2">
      {prev && <button className={paginationArrowClassName}>prev</button>}
      {one && <button className={paginationButtonClassName}>1</button>}
      {two && (
        <>
          <button className={paginationButtonClassName}>1</button>
          <button className={paginationButtonClassName}>2</button>
        </>
      )}
      {three && (
        <>
          <button className={paginationButtonClassName}>1</button>
          <button className={paginationButtonClassName}>2</button>
          <button className={paginationButtonClassName}>3</button>
        </>
      )}
      {many && (
        <>
          <button className={paginationButtonClassName}>1</button>
          <button className={paginationButtonClassName}>2</button>
          <button className={paginationButtonClassName}>3</button>
          <span>...</span>
          <button className={paginationButtonClassName}>{pages}</button>
        </>
      )}
      {next && <button className={paginationArrowClassName}>next</button>}
    </div>
  );
}
