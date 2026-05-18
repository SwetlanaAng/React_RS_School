import { render, screen } from '@testing-library/react';
import Input from './Input';
import { expect, vi } from 'vitest';

describe('Input', () => {
  it('renders Input', () => {
    render(
      <Input
        onChange={vi.fn()}
        type="text"
        placeholder="Search"
        name="search"
        id="search"
      />
    );
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });
});
