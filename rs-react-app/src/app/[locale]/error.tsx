'use client';

import ErrorUI from '@/components/ErrorUI/ErrorUI';
import Button from '@/components/Button/Button';
import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  return (
    <ErrorUI errorMessage={t('somethingWrong')}>
      <Button type="button" onClick={reset}>
        {t('return')}
      </Button>
    </ErrorUI>
  );
}
