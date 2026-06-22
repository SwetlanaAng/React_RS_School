import { buttonClassName } from '@/shared/classes';
import Image from 'next/image';
import notFoundImage from '@/assets/404.png';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-fuchsia-50 px-4 dark:bg-slate-950">
        <section className="flex w-full max-w-4xl flex-col items-center rounded-3xl border border-teal-100 bg-white px-8 py-12 text-center shadow-xl dark:border-teal-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-100">
            Oops! The page was not found
          </h1>
          <Image
            src={notFoundImage}
            alt="404"
            className="my-8 w-full max-w-2xl object-contain"
          />
          <Link href="/en" className={buttonClassName}>
            Return to home page
          </Link>
        </section>
      </body>
    </html>
  );
}
