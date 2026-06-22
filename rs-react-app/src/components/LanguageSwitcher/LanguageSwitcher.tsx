'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  return (
    <div className="flex gap-1">
      {routing.locales.map((nextLocale) => (
        <button
          key={nextLocale}
          type="button"
          aria-label={t('switchTo', { locale: nextLocale.toUpperCase() })}
          onClick={() => {
            router.replace(pathname, { locale: nextLocale });
          }}
          className={`rounded px-2 py-1 text-sm font-bold transition-colors ${
            locale === nextLocale
              ? 'bg-purple-300 text-teal-900 dark:bg-purple-800 dark:text-teal-100'
              : 'text-teal-700 hover:bg-teal-200 dark:text-teal-200 dark:hover:bg-slate-800'
          }`}
        >
          {t(nextLocale)}
        </button>
      ))}
    </div>
  );
}
