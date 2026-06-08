import type { FormSubmission } from '../../Shared/buildSubmission';

const formLabels: Record<FormSubmission['source'], string> = {
  uncontrolled: 'Uncontrolled form',
  rhf: 'React Hook Form',
};

interface SubmissionCardProps {
  submission: FormSubmission;
  isHighlighted?: boolean;
}

export default function SubmissionCard({
  submission,
  isHighlighted = false,
}: SubmissionCardProps) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border-2 p-4 shadow-md transition-colors duration-500 ${
        isHighlighted
          ? 'border-purple-400 bg-purple-50 shadow-purple-200/60'
          : 'border-teal-200 bg-white shadow-teal-100'
      }`}
    >
      <h3 className="border-b border-teal-100 pb-2 text-base font-bold text-teal-800">
        {formLabels[submission.source]}
      </h3>
      <img
        src={submission.image}
        alt={`${submission.name} profile`}
        className="h-56 w-full rounded-xl border border-teal-100 bg-teal-50 object-contain"
      />
      <div className="space-y-1 text-left text-sm text-slate-700">
        <p>
          <span className="font-semibold text-teal-800">Name:</span>{' '}
          {submission.name}
        </p>
        <p>
          <span className="font-semibold text-teal-800">Age:</span>{' '}
          {submission.age}
        </p>
        <p>
          <span className="font-semibold text-teal-800">Email:</span>{' '}
          {submission.email}
        </p>
        <p>
          <span className="font-semibold text-teal-800">Gender:</span>{' '}
          {submission.gender}
        </p>
        <p>
          <span className="font-semibold text-teal-800">Country:</span>{' '}
          {submission.country}
        </p>
        <p>
          <span className="font-semibold text-teal-800">Password:</span>{' '}
          {submission.password}
        </p>
        <p>
          <span className="font-semibold text-teal-800">
            Terms & Conditions:
          </span>{' '}
          {submission.agreement ? 'Accepted' : 'Not accepted'}
        </p>
      </div>
    </article>
  );
}
