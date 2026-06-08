import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(
      <Button type="button" disabled={false}>
        Click me
      </Button>
    );

    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button type="button" disabled={false} onClick={handleClick}>
        Click me
      </Button>
    );

    await user.click(screen.getByRole('button', { name: 'Click me' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Button type="button" disabled>
        Disabled
      </Button>
    );

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <Button type="button" disabled={false} className="custom-class">
        Styled
      </Button>
    );

    expect(screen.getByRole('button', { name: 'Styled' })).toHaveClass(
      'custom-class'
    );
  });
});
