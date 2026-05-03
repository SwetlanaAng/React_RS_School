import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import App from '../App';
import { mockCharacters } from './mockCharacters';
import userEvent from '@testing-library/user-event';

describe('App', () => {
    afterEach(() => {
        vi.restoreAllMocks();
      });
  it('renders App', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockCharacters }),
      } as Response);
    render(
      <App />
    );
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
    const errorButton = screen.getByRole('button', { name: 'Error Button' });
    expect(errorButton).toBeInTheDocument();
  });
  it('renders App with cards from API', async() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockCharacters }),
      } as Response);
    render(
      <App />
    );
    const cardImg = await screen.findByAltText('Rick Sanchez');
  expect(cardImg).toBeInTheDocument();
    const cardTitle = screen.getByText('Rick Sanchez');
    expect(cardTitle).toBeInTheDocument();
    const cardImg2 = screen.getByAltText('Morty Smith');
    expect(cardImg2).toBeInTheDocument();
    const cardTitle2 = screen.getByText('Morty Smith');
    expect(cardTitle2).toBeInTheDocument();
  });
  it('shows spinner while characters are loading', () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(
      new Promise(() => {})
    );
    render(<App />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  it('shows error UI when API request fails', async() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false
      } as Response);
    render(<App />);
    expect(
        await screen.findByText(/there is no matching characters/i)
      ).toBeInTheDocument();
  });
  it('fetches characters by submitted search value', async() => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ results: []}),
      } as Response);
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'Rick');
    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    expect(fetchMock).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/?name=Rick'
      );
  });
  it('shows error UI when error button clicked', async() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ results: [] }),
      } as Response);
    render(<App />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /error button/i });
    await user.click(button)
    expect(
        await screen.findByText(/Something went wrong/i)
      ).toBeInTheDocument();
  });

});