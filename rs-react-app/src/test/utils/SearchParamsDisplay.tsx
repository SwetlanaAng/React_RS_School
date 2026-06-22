'use client';

import { useSearchParams } from 'next/navigation';

export function SearchParamsDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return <span data-testid="location">{query ? `?${query}` : ''}</span>;
}
