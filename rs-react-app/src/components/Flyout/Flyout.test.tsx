import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NextIntlClientProvider } from 'next-intl';
import type { Character } from '@/shared/types';
import charactersReducer from '@/store/charactersSlice';
import { mockCharacters } from '@/test/mockCharacters';
import en from '@/messages/en.json';
import { Flyout } from './Flyout';

const downloadCsvActionMock = vi.hoisted(() => vi.fn());
const triggerCsvDownloadMock = vi.hoisted(() => vi.fn());

vi.mock('@/app/actions/downloadCsvAction', () => ({
  downloadCsvAction: downloadCsvActionMock,
}));

vi.mock('@/shared/triggerCsvDownload', () => ({
  triggerCsvDownload: triggerCsvDownloadMock,
}));

function renderFlyout(selected: Character[] = []) {
  const store = configureStore({
    reducer: {
      characters: charactersReducer,
    },
    preloadedState: {
      characters: {
        selected,
      },
    },
  });

  const view = render(
    <NextIntlClientProvider locale="en" messages={en}>
      <Provider store={store}>
        <Flyout />
      </Provider>
    </NextIntlClientProvider>
  );

  return { ...view, store };
}

describe('Flyout', () => {
  beforeEach(() => {
    downloadCsvActionMock.mockReset();
    triggerCsvDownloadMock.mockReset();
    downloadCsvActionMock.mockResolvedValue({
      ok: true,
      csv: 'csv-content',
      filename: 'characters_2.csv',
    });
  });

  it('does not render when no characters are selected', () => {
    renderFlyout();

    expect(screen.queryByText(/selected characters/i)).not.toBeInTheDocument();
  });

  it('renders selected amount and action buttons', () => {
    renderFlyout(mockCharacters);

    const selectedText = screen.getByText('Selected characters : 2');
    const flyout = selectedText.closest('div');

    expect(selectedText).toBeInTheDocument();
    expect(flyout).toHaveClass('sticky', 'bottom-0');
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('clears selected characters when unselect all is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderFlyout(mockCharacters);

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(store.getState().characters.selected).toHaveLength(0);
    expect(screen.queryByText(/selected characters/i)).not.toBeInTheDocument();
  });

  it('downloads selected characters via server action', async () => {
    const user = userEvent.setup();
    renderFlyout(mockCharacters);

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(downloadCsvActionMock).toHaveBeenCalledWith(mockCharacters);
    expect(triggerCsvDownloadMock).toHaveBeenCalledWith(
      'csv-content',
      'characters_2.csv'
    );
  });
});
