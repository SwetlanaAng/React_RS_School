import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxField from './CheckboxField';

describe('CheckboxField', () => {
  it('renders checkbox with label', () => {
    render(
      <CheckboxField name="agreement" id="agree" label="Terms & Conditions" />
    );

    const checkbox = screen.getByLabelText('Terms & Conditions');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('name', 'agreement');
  });

  it('shows error message', () => {
    render(
      <CheckboxField
        name="agreement"
        id="agree"
        label="Terms & Conditions"
        errorMessage="Please accept the Terms & Conditions"
      />
    );

    expect(
      screen.getByText('Please accept the Terms & Conditions')
    ).toBeInTheDocument();
  });

  it('calls onChange when checked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <CheckboxField
        name="agreement"
        id="agree"
        label="Terms & Conditions"
        onChange={handleChange}
      />
    );

    await user.click(screen.getByLabelText('Terms & Conditions'));

    expect(handleChange).toHaveBeenCalled();
  });
});
