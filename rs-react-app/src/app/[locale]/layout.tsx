import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getMessagesForLocale, resolveLocale } from '@/i18n/locale';
import Header from '@/Layouts/Header';
import { Providers } from '@/app/providers';
import '@/index.css';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: getMessagesForLocale(resolveLocale(locale)).metadata.title,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = resolveLocale((await params).locale);

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body id="root">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
