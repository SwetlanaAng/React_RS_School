import { render, screen } from '@testing-library/react';
import SubmissionCard from './SubmissionCard';

const submission = {
  id: '1',
  source: 'uncontrolled' as const,
  name: 'Anna',
  age: '25',
  email: 'anna@example.com',
  password: 'Pass1!',
  gender: 'female',
  agreement: true,
  image: 'data:image/png;base64,abc',
  country: 'Poland',
};

describe('SubmissionCard', () => {
  it('renders form label and submission data', () => {
    render(<SubmissionCard submission={submission} />);

    expect(
      screen.getByRole('heading', { name: 'Uncontrolled form' })
    ).toBeInTheDocument();
    expect(screen.getByText('Anna')).toBeInTheDocument();
    expect(screen.getByText('anna@example.com')).toBeInTheDocument();
    expect(screen.getByText('Poland')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Anna profile' })).toHaveAttribute(
      'src',
      submission.image
    );
  });

  it('applies highlight styles when isHighlighted is true', () => {
    const { container } = render(
      <SubmissionCard
        submission={{ ...submission, source: 'rhf' }}
        isHighlighted
      />
    );

    expect(container.firstChild).toHaveClass('border-purple-400');
    expect(
      screen.getByRole('heading', { name: 'React Hook Form' })
    ).toBeInTheDocument();
  });
});
