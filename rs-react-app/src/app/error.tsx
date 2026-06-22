'use client';
import ErrorUI from '@/components/ErrorUI/ErrorUI';
import Button from '@/components/Button/Button';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorUI errorMessage="Something went wrong">
      <Button type="button" onClick={reset}>
        Return
      </Button>
    </ErrorUI>
  );
}
