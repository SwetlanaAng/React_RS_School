import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from './LanguageSwitcher';
import { mockReplace } from '@/test/mocks/next-navigation';
import { renderWithProviders } from '@/test/utils/testUtils';

describe('LanguageSwitcher', () => {
  it('renders locale buttons and switches language', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />, { locale: 'en' });

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();

    await user.click(screen.getByText('RU'));

    expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'ru' });
  });
});
