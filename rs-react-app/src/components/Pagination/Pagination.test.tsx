import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import { mockPush } from '@/test/mocks/next-navigation';
import { renderWithProviders } from '@/test/utils/testUtils';
import { SearchParamsDisplay } from '@/test/utils/SearchParamsDisplay';

function renderPagination({
  currentPage = 1,
  searchParams = 'page=1',
  pages = 5,
  prev = null,
  next = 'https://rickandmortyapi.com/api/character?page=2',
}: {
  currentPage?: number;
  initialEntry?: string;
  searchParams?: string;
  pages?: number;
  prev?: string | null;
  next?: string | null;
} = {}) {
  return renderWithProviders(
    <>
      <Pagination
        count={pages * 20}
        pages={pages}
        next={next}
        prev={prev}
        currentPage={currentPage}
      />
      <SearchParamsDisplay />
    </>,
    { searchParams }
  );
}

describe('Pagination', () => {
  it('renders page buttons and highlights current page', () => {
    renderPagination({ currentPage: 2, searchParams: 'page=2', pages: 3 });

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toHaveClass(
      'bg-fuchsia-200'
    );
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('renders ellipsis for many pages', () => {
    renderPagination({ currentPage: 2, searchParams: 'page=2', pages: 10 });

    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('changes page when page button is clicked', async () => {
    const user = userEvent.setup();

    renderPagination({
      currentPage: 1,
      searchParams: 'name=Rick&page=1&details=1',
      pages: 5,
    });

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(mockPush).toHaveBeenCalledWith('/?name=Rick&page=3&details=1');
  });

  it('changes page when prev and next buttons are clicked', async () => {
    const user = userEvent.setup();

    renderPagination({
      currentPage: 2,
      searchParams: 'page=2',
      pages: 5,
      prev: 'https://rickandmortyapi.com/api/character?page=1',
      next: 'https://rickandmortyapi.com/api/character?page=3',
    });

    await user.click(screen.getByRole('button', { name: /prev/i }));

    expect(mockPush).toHaveBeenCalledWith('/?page=1');

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(mockPush).toHaveBeenCalledWith('/?page=3');
  });

  it('removes details from URL when pagination empty area is clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderPagination({
      searchParams: 'page=1&details=1',
    });

    const paginationContainer = container.firstElementChild;

    expect(paginationContainer).toBeInstanceOf(HTMLElement);
    if (!(paginationContainer instanceof HTMLElement)) {
      throw new Error('Expected pagination container to be rendered');
    }

    await user.click(paginationContainer);

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });
});
