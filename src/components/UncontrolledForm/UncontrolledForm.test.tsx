import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import UncontrolledForm from './UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all form fields', () => {
    renderWithProviders(<UncontrolledForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  it('shows validation errors on submit with empty form', async () => {
    const user = userEvent.setup();

    renderWithProviders(<UncontrolledForm />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      screen.getByText(
        'The first letter must be capitalized, and the remaining letters must be lowercase'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Image is required')).toBeInTheDocument();
    expect(screen.getByText('Country is required')).toBeInTheDocument();
  });

  it('clears field error after submit when field is changed', async () => {
    const user = userEvent.setup();

    renderWithProviders(<UncontrolledForm />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Country is required')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Country'), 'Poland');

    expect(screen.queryByText('Country is required')).not.toBeInTheDocument();
  });
});
