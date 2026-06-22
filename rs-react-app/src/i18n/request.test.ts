import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

vi.mock('next-intl/server', () => ({
  getRequestConfig: (callback: unknown) => callback,
}));

import requestConfig from '@/i18n/request';

describe('i18n request config', () => {
  it('uses explicit locale when provided', async () => {
    const result = await requestConfig({
      locale: 'ru',
      requestLocale: Promise.resolve('en'),
    });

    expect(result.locale).toBe('ru');
    expect(result.messages).toEqual(ru);
  });

  it('uses requestLocale when locale is missing', async () => {
    const result = await requestConfig({
      requestLocale: Promise.resolve('ru'),
    });

    expect(result.locale).toBe('ru');
    expect(result.messages).toEqual(ru);
  });

  it('falls back to default locale when requestLocale fails', async () => {
    const result = await requestConfig({
      requestLocale: Promise.reject(new Error('headers')),
    });

    expect(result.locale).toBe('en');
    expect(result.messages).toEqual(en);
  });
});
