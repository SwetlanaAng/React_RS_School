import { getRequestConfig } from 'next-intl/server';
import { getMessagesForLocale, getValidLocale } from './locale';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  let resolvedLocale = locale;

  if (!resolvedLocale) {
    try {
      resolvedLocale = await requestLocale;
    } catch {
      resolvedLocale = undefined;
    }
  }

  const validLocale = getValidLocale(resolvedLocale);

  return {
    locale: validLocale,
    messages: getMessagesForLocale(validLocale),
  };
});
