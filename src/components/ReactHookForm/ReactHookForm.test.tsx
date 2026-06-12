import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import ReactHookForm from './ReactHookForm';

describe('ReactHookForm', () => {
  it('renders all form fields', () => {
    renderWithProviders(<ReactHookForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms & Conditions')).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    renderWithProviders(<ReactHookForm />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('shows live validation error for invalid name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ReactHookForm />);

    await user.type(screen.getByLabelText('Name'), 'john');

    expect(
      screen.getByText(
        'The first letter must be capitalized, and the remaining letters must be lowercase'
      )
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('keeps submit disabled when image is not uploaded', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ReactHookForm />);

    await user.type(screen.getByLabelText('Name'), 'Anna');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'anna@example.com');
    await user.type(screen.getByLabelText('Password'), 'Pass1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Pass1!');
    await user.type(screen.getByLabelText('Country'), 'Poland');
    await user.click(screen.getByLabelText('Male'));
    await user.click(screen.getByLabelText('Terms & Conditions'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });
  });

  it('keeps submit disabled when passwords do not match', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ReactHookForm />);

    await user.type(screen.getByLabelText('Password'), 'Pass1!');
    await user.type(screen.getByLabelText('Confirm password'), 'Different1!');

    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
