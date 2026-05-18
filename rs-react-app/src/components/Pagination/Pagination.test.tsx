import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import Pagination from './Pagination';

function LocationDisplay() {
  const location = useLocation();

  return <span data-testid="location">{location.search}</span>;
}

function renderPagination({
  currentPage = 1,
  initialEntry = '/?page=1',
  pages = 5,
  prev = null,
  next = 'https://rickandmortyapi.com/api/character?page=2',
  setPage = vi.fn(),
}: {
  currentPage?: number;
  initialEntry?: string;
  pages?: number;
  prev?: string | null;
  next?: string | null;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
} = {}) {
  const view = render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Pagination
        count={pages * 20}
        pages={pages}
        next={next}
        prev={prev}
        currentPage={currentPage}
        setPage={setPage}
      />
      <LocationDisplay />
    </MemoryRouter>
  );

  return { ...view, setPage };
}

describe('Pagination', () => {
  it('renders page buttons and highlights current page', () => {
    renderPagination({ currentPage: 2, pages: 3 });

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toHaveClass(
      'bg-fuchsia-200'
    );
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('renders ellipsis for many pages', () => {
    renderPagination({ currentPage: 2, pages: 10 });

    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('changes page and removes details from URL when page button is clicked', async () => {
    const user = userEvent.setup();
    const setPage = vi.fn();

    renderPagination({
      currentPage: 1,
      initialEntry: '/?name=Rick&page=1&details=1',
      pages: 5,
      setPage,
    });

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(setPage).toHaveBeenCalledWith(3);
    expect(screen.getByTestId('location')).toHaveTextContent(
      '?name=Rick&page=3'
    );
  });

  it('changes page when prev and next buttons are clicked', async () => {
    const user = userEvent.setup();
    const setPage = vi.fn();

    renderPagination({
      currentPage: 2,
      initialEntry: '/?page=2',
      pages: 5,
      prev: 'https://rickandmortyapi.com/api/character?page=1',
      next: 'https://rickandmortyapi.com/api/character?page=3',
      setPage,
    });

    await user.click(screen.getByRole('button', { name: /prev/i }));
    expect(setPage).toHaveBeenCalledWith(1);
    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(setPage).toHaveBeenCalledWith(3);
    expect(screen.getByTestId('location')).toHaveTextContent('?page=3');
  });

  it('removes details from URL when pagination empty area is clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderPagination({
      initialEntry: '/?page=1&details=1',
    });

    const paginationContainer = container.firstElementChild;

    expect(paginationContainer).toBeInstanceOf(HTMLElement);
    if (!(paginationContainer instanceof HTMLElement)) {
      throw new Error('Expected pagination container to be rendered');
    }

    await user.click(paginationContainer);

    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
  });
});
