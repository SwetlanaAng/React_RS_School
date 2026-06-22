import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';
import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];
export type Messages = typeof en;

const messagesByLocale: Record<Locale, Messages> = { en, ru };

export function resolveLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) {
    notFound();
  }
  return value;
}

export function getValidLocale(value: string | undefined): Locale {
  if (value !== undefined && hasLocale(routing.locales, value)) {
    return value;
  }
  return routing.defaultLocale;
}

export function getMessagesForLocale(locale: Locale): Messages {
  return messagesByLocale[locale];
}
