import { render, screen } from '@testing-library/react';
import SearchForm, { type SearchFormProps } from './SearchForm';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockCharacters } from '../../test/mockCharacters';
import { ApiService } from '../../services/apiService/apiService';
describe('SearchForm', () => {
  function renderSearchForm(props: SearchFormProps) {
    return render(<SearchForm {...props} />);
  }
  it('renders SearchForm', () => {
    renderSearchForm({ onSubmit: () => {}, error: false, search: '' });
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toBeInTheDocument();
  });
  it('throws error if error is true', () => {
    expect(() =>
      renderSearchForm({ onSubmit: () => {}, error: true, search: '' })
    ).toThrow('ErrorBoundary test error');
  });
  it('calls onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    renderSearchForm({ onSubmit: onSubmit, error: false, search: '' });
    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith('');
  });
  it('calls onSubmit when form is submitted with value', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    renderSearchForm({ onSubmit: onSubmit, error: false, search: 'Rick' });
    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);
    expect(onSubmit).toHaveBeenCalledWith('Rick');
  });
  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderSearchForm({ onSubmit: () => {}, error: false, search: '' });
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'Rick');
    expect(input).toHaveValue('Rick');
  });
  it('sends request to API when form is submitted', async () => {
    const user = userEvent.setup();
    const service = new ApiService();
    renderSearchForm({ onSubmit: () => {}, error: false, search: 'Rick' });

    const button = screen.getByRole('button', { name: 'Search' });
    await user.click(button);
    const filteredCharacters = mockCharacters.filter((character) =>
      character.name.includes('Rick')
    );

    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        results: filteredCharacters,
      }),
    } as Response);
    const result = await service.getCharacters('Rick');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick'
    );
    expect(result).toEqual(filteredCharacters);
  });
});
