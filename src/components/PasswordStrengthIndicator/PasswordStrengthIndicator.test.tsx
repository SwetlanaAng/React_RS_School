import { render, screen } from '@testing-library/react';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

describe('PasswordStrengthIndicator', () => {
  it('renders all password rules', () => {
    render(<PasswordStrengthIndicator password="" />);

    expect(screen.getByText(/1 number/)).toBeInTheDocument();
    expect(screen.getByText(/1 uppercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/1 lowercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/1 special character/)).toBeInTheDocument();
  });

  it('marks unmet rules for weak password', () => {
    render(<PasswordStrengthIndicator password="abc" />);

    expect(screen.getByText(/○ 1 number/)).toBeInTheDocument();
    expect(screen.getByText(/○ 1 uppercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/✓ 1 lowercase letter/)).toBeInTheDocument();
  });

  it('marks all rules as met for strong password', () => {
    render(<PasswordStrengthIndicator password="Abc1!" />);

    expect(screen.getByText(/✓ 1 number/)).toBeInTheDocument();
    expect(screen.getByText(/✓ 1 uppercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/✓ 1 lowercase letter/)).toBeInTheDocument();
    expect(screen.getByText(/✓ 1 special character/)).toBeInTheDocument();
  });
});
