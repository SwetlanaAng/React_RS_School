import { getRequestConfig } from 'next-intl/server';
import { getMessagesForLocale, getValidLocale } from './locale';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = getValidLocale(await requestLocale);

  return {
    locale,
    messages: getMessagesForLocale(locale),
  };
});
