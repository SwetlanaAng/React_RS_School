import { buttonClassName } from '@/shared/classes';
import Image from 'next/image';
import notFoundImage from '@/assets/404.png';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <main className="flex min-h-screen items-center justify-center bg-fuchsia-50 px-4 transition-colors duration-300 dark:bg-slate-950">
      <section
        role="status"
        className="flex w-full max-w-4xl flex-col items-center rounded-3xl border border-teal-100 bg-white px-8 py-12 text-center shadow-xl transition-colors duration-300 dark:border-teal-800 dark:bg-slate-900 dark:shadow-teal-950"
      >
        <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-100">
          {t('title')}
        </h1>
        <Image
          src={notFoundImage}
          alt="404"
          className="my-8 w-full max-w-2xl object-contain"
        />
        <Link href="/" className={buttonClassName}>
          {t('returnHome')}
        </Link>
      </section>
    </main>
  );
}
