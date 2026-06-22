import {
  clearDetailsAction,
  searchAction,
  selectDetailsAction,
} from '@/app/actions/searchActions';
import { redirectMock } from '@/test/mocks/next-navigation';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

const cookieSetMock = vi.hoisted(() => vi.fn());
const cookieDeleteMock = vi.hoisted(() => vi.fn());

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    set: cookieSetMock,
    delete: cookieDeleteMock,
  })),
}));

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'en'),
}));

function createFormData(values: Record<string, string>) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return formData;
}

describe('searchActions', () => {
  beforeEach(() => {
    cookieSetMock.mockReset();
    cookieDeleteMock.mockReset();
    redirectMock.mockClear();
  });

  it('searchAction stores search in cookie and redirects with query', async () => {
    await expect(
      searchAction(null, createFormData({ search: '  Rick  ' }))
    ).rejects.toThrow('NEXT_REDIRECT');

    expect(cookieSetMock).toHaveBeenCalledWith(
      SEARCH_STORAGE_KEY,
      'Rick',
      expect.objectContaining({ path: '/' })
    );
    expect(redirectMock).toHaveBeenCalledWith({
      href: { pathname: '/', query: { page: '1', name: 'Rick' } },
      locale: 'en',
    });
  });

  it('searchAction clears cookie and redirects without name for empty search', async () => {
    await expect(
      searchAction(null, createFormData({ search: '   ' }))
    ).rejects.toThrow('NEXT_REDIRECT');

    expect(cookieDeleteMock).toHaveBeenCalledWith(SEARCH_STORAGE_KEY);
    expect(redirectMock).toHaveBeenCalledWith({
      href: { pathname: '/', query: { page: '1' } },
      locale: 'en',
    });
  });

  it('selectDetailsAction redirects with details query', async () => {
    await expect(
      selectDetailsAction(
        createFormData({
          detailsId: '5',
          name: 'Rick',
          page: '2',
        })
      )
    ).rejects.toThrow('NEXT_REDIRECT');

    expect(redirectMock).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { name: 'Rick', page: '2', details: '5' },
      },
      locale: 'en',
    });
  });

  it('clearDetailsAction redirects without details query', async () => {
    await expect(
      clearDetailsAction(
        createFormData({
          name: 'Rick',
          page: '2',
        })
      )
    ).rejects.toThrow('NEXT_REDIRECT');

    expect(redirectMock).toHaveBeenCalledWith({
      href: {
        pathname: '/',
        query: { name: 'Rick', page: '2' },
      },
      locale: 'en',
    });
  });
});
