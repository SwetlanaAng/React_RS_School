import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import type { Character } from '../../shared/types';
import charactersReducer from '../../store/charactersSlice';
import { mockCharacters } from '../../test/mockCharacters';
import { Flyout } from './Flyout';

const downloadMock = vi.hoisted(() => vi.fn());

vi.mock('../../hooks/useDownload', () => ({
  useDownload: () => ({
    download: downloadMock,
  }),
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
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  return { ...view, store };
}

describe('Flyout', () => {
  beforeEach(() => {
    downloadMock.mockClear();
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

  it('downloads selected characters with selected amount', async () => {
    const user = userEvent.setup();
    renderFlyout(mockCharacters);

    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(downloadMock).toHaveBeenCalledWith(mockCharacters, 2);
  });
});
