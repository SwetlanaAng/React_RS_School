import { render } from '@testing-library/react';
import PaginationSkeleton from './PaginationSkeleton';

describe('PaginationSkeleton', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<PaginationSkeleton />);

    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(7);
  });
});
