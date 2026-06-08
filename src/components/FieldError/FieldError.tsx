interface FieldErrorProps {
  message?: string | null;
}

export default function FieldError({ message }: FieldErrorProps) {
  return (
    <div
      className="min-h-5 text-sm text-rose-600"
      aria-live="polite"
      {...(message ? {} : { 'aria-hidden': true })}
    >
      {message ?? '\u00A0'}
    </div>
  );
}
