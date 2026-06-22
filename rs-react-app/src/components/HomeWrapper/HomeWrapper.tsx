'use client';
import { useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import Button from '@/components/Button/Button';

function ErrorTrigger({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test error');
  return null;
}

export function HomeWrapper({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState(false);
  return (
    <>
      <ErrorBoundary errorSwitcher={setError}>
        <ErrorTrigger shouldThrow={error} />
        {children}
      </ErrorBoundary>
      <div className="flex justify-center">
        <Button
          type="button"
          className="mb-6"
          onClick={() => {
            setError(true);
          }}
        >
          Error Button
        </Button>
      </div>
    </>
  );
}
