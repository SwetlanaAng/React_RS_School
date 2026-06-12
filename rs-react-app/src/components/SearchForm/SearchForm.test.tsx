import { render, screen } from '@testing-library/react';
import SearchForm, { type SearchFormProps } from './SearchForm';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  function renderSearchForm(props: SearchFormProps) {
    return render(<SearchForm {...props} />);
  }

  it('renders SearchForm', () => {
    renderSearchForm({ onSubmit: vi.fn(), error: false, search: '' });

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('throws error if error is true', () => {
    expect(() =>
      renderSearchForm({ onSubmit: vi.fn(), error: true, search: '' })
    ).toThrow('ErrorBoundary test error');
  });

  it('calls onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderSearchForm({ onSubmit, error: false, search: '' });

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledWith('');
  });

  it('calls onSubmit when form is submitted with value', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderSearchForm({ onSubmit, error: false, search: 'Rick' });

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledWith('Rick');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    renderSearchForm({ onSubmit: vi.fn(), error: false, search: '' });

    const input = screen.getByPlaceholderText('Search...');

    await user.type(input, 'Rick');

    expect(input).toHaveValue('Rick');
  });

  it('trims whitespace from submitted search value', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderSearchForm({ onSubmit, error: false, search: '' });

    await user.type(screen.getByPlaceholderText('Search...'), '  Rick  ');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledWith('Rick');
  });
});
