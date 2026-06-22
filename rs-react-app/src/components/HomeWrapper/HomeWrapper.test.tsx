import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeWrapper } from './HomeWrapper';
import { renderWithProviders } from '@/test/utils/testUtils';
import en from '@/messages/en.json';

describe('HomeWrapper', () => {
  it('renders children inside the error boundary', () => {
    renderWithProviders(
      <HomeWrapper>
        <p>Home content</p>
      </HomeWrapper>
    );

    expect(screen.getByText('Home content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: en.home.errorButton })
    ).toBeInTheDocument();
  });

  it('shows error UI when the error button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <HomeWrapper>
        <p>Home content</p>
      </HomeWrapper>
    );

    await user.click(
      screen.getByRole('button', { name: en.home.errorButton })
    );

    expect(screen.getByText(en.errors.somethingWrong)).toBeInTheDocument();
    expect(screen.queryByText('Home content')).not.toBeInTheDocument();
  });

  it('restores children after clicking return in error UI', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <HomeWrapper>
        <p>Home content</p>
      </HomeWrapper>
    );

    await user.click(
      screen.getByRole('button', { name: en.home.errorButton })
    );
    await user.click(screen.getByRole('button', { name: en.errors.return }));

    expect(screen.getByText('Home content')).toBeInTheDocument();
    expect(
      screen.queryByText(en.errors.somethingWrong)
    ).not.toBeInTheDocument();
  });
});
