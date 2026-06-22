import Image from 'next/image';
import authorImage from '@/assets/author.png';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/locale';

interface AboutProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function About({ params }: AboutProps) {
  const { locale } = await params;
  const validLocale = resolveLocale(locale);

  setRequestLocale(validLocale);

  const t = await getTranslations({ locale: validLocale, namespace: 'about' });

  return (
    <main className="flex min-h-screen items-center justify-center bg-fuchsia-50 p-4 transition-colors duration-300 dark:bg-slate-950">
      <section
        role="status"
        className="flex w-full max-w-4xl flex-col items-center rounded-3xl border border-teal-100 bg-white px-8 py-12 text-center shadow-xl transition-colors duration-300 dark:border-teal-800 dark:bg-slate-900 dark:shadow-teal-950"
      >
        <div className="text-2xl text-teal-700 dark:text-teal-100">
          <span>
            {t('createdBy')}{' '}
            <a
              className="cursor-pointer text-yellow-400 dark:text-yellow-300"
              href="https://github.com/SwetlanaAng"
              target="_blank"
              rel="noreferrer"
            >
              {t('authorName')}
            </a>{' '}
            {t('asPartOf')}{' '}
            <a
              className="cursor-pointer text-yellow-400 dark:text-yellow-300"
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
            >
              {t('courseName')}
            </a>
            . {t('purpose')}
          </span>
        </div>
        <Image
          src={authorImage}
          alt={t('authorImageAlt')}
          className="my-8 w-full max-w-md object-contain"
        />
      </section>
    </main>
  );
}
