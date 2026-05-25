import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../contexts/ThemeContext/ThemeContextProvider';
import Header from './Header';
describe('Header theme toggle', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(document.documentElement).not.toHaveClass('dark');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement).toHaveClass('dark');
    await user.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(document.documentElement).not.toHaveClass('dark');
  });
});
