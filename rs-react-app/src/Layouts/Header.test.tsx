import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContextProvider';
import { store } from '@/store/store';
import Header from './Header';
import { mockRefresh } from '@/test/mocks/next-navigation';
import { renderWithProviders } from '@/test/utils/testUtils';

describe('Header theme toggle', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark theme when theme button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
      { store }
    );

    expect(document.documentElement).not.toHaveClass('dark');

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(document.documentElement).toHaveClass('dark');

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('refreshes route data when reload button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <ThemeProvider>
        <Header />
      </ThemeProvider>,
      { store }
    );

    await user.click(
      screen.getByRole('button', { name: /cache invalidation/i })
    );

    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
