import { screen } from '@testing-library/react';
import { MainContent } from './MainContent';
import { mockCharacters } from '@/test/mockCharacters';
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

describe('MainContent', () => {
  afterEach(() => {
    getCharactersMock.mockReset();
  });

  async function renderMainContent(page = 1, search = '') {
    const ui = await MainContent({ page, search });
    return renderWithProviders(ui, { searchParams: `page=${page}` });
  }

  it('renders characters when API request succeeds', async () => {
    getCharactersMock.mockResolvedValue({
      ok: true,
      data: mockResponseCharacter,
    });

    await renderMainContent(1, 'Rick');

    expect(getCharactersMock).toHaveBeenCalledWith('Rick', 1);
    expect(screen.getByText(mockCharacters[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacters[1].name)).toBeInTheDocument();
  });

  it('renders error UI when API request fails', async () => {
    getCharactersMock.mockResolvedValue({
      ok: false,
      error: 'charactersNotFound',
    });

    await renderMainContent(1, 'Unknown');

    expect(
      screen.getByText(en.errors.charactersNotFound)
    ).toBeInTheDocument();
  });
});
