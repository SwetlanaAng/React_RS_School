import {
  getMessagesForLocale,
  getValidLocale,
  resolveLocale,
} from '@/i18n/locale';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

const notFoundMock = vi.hoisted(() => vi.fn(() => {
  throw new Error('NOT_FOUND');
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('@/test/mocks/next-navigation');
  return {
    ...actual,
    notFound: notFoundMock,
  };
});

describe('locale helpers', () => {
  it('returns valid locale when value is supported', () => {
    expect(getValidLocale('ru')).toBe('ru');
    expect(getValidLocale('en')).toBe('en');
  });

  it('falls back to default locale for unsupported value', () => {
    expect(getValidLocale('de')).toBe('en');
    expect(getValidLocale(undefined)).toBe('en');
  });

  it('returns messages for locale', () => {
    expect(getMessagesForLocale('en')).toEqual(en);
    expect(getMessagesForLocale('ru')).toEqual(ru);
  });

  it('resolves supported locale', () => {
    expect(resolveLocale('ru')).toBe('ru');
  });

  it('calls notFound for unsupported locale', () => {
    expect(() => resolveLocale('de')).toThrow('NOT_FOUND');
    expect(notFoundMock).toHaveBeenCalled();
  });
});
