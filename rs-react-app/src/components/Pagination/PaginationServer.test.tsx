import { screen } from '@testing-library/react';
import { PaginationServer } from './PaginationServer';
import { mockResponseCharacter } from '@/test/mockResponseCharacter';
import { renderWithProviders } from '@/test/utils/testUtils';
import en from '@/messages/en.json';

const getCharactersMock = vi.hoisted(() => vi.fn());

vi.mock('@/shared/getCharacters', () => ({
  getCharacters: getCharactersMock,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async () => {
    return (key: keyof typeof en.errors) => en.errors[key];
  },
}));

describe('PaginationServer', () => {
  afterEach(() => {
    getCharactersMock.mockReset();
  });

  async function renderPaginationServer(page = 1, search = '') {
    const ui = await PaginationServer({ page, search });
    return renderWithProviders(ui, { searchParams: `page=${page}` });
  }

  it('renders pagination when API request succeeds', async () => {
    getCharactersMock.mockResolvedValue({
      ok: true,
      data: {
        ...mockResponseCharacter,
        info: {
          ...mockResponseCharacter.info,
          pages: 3,
          next: 'https://rickandmortyapi.com/api/character?page=2',
        },
      },
    });

    await renderPaginationServer(1, 'Rick');

    expect(getCharactersMock).toHaveBeenCalledWith('Rick', 1);
    expect(screen.getByRole('button', { name: '1' })).toHaveClass(
      'bg-fuchsia-200'
    );
    expect(screen.getByRole('button', { name: 'next' })).toBeInTheDocument();
  });

  it('renders error UI when API request fails', async () => {
    getCharactersMock.mockResolvedValue({
      ok: false,
      error: 'invalidApiResponse',
    });

    await renderPaginationServer(1);

    expect(screen.getByText(en.errors.invalidApiResponse)).toBeInTheDocument();
  });
});
