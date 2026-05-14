import type { Info } from '../../shared/types';

export default function Pagination({ prev, next, pages }: Info) {
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
    <div>
      {prev && <button>prev</button>}
      {one && <button>1</button>}
      {two && (
        <>
          <button>1</button>
          <button>2</button>
        </>
      )}
      {three && (
        <>
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </>
      )}
      {many && (
        <>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>{pages}</button>
        </>
      )}
      {next && <button>next</button>}
    </div>
  );
}
