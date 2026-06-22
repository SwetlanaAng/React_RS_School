import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders loading status', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });
});
