'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { getValidLocale } from '@/i18n/locale';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

function buildHomeQuery({
  name,
  page,
  details,
}: {
  name?: string;
  page?: string;
  details?: string;
}): Record<string, string> {
  const query: Record<string, string> = {};

  if (name) {
    query.name = name;
  }

  if (page) {
    query.page = page;
  }

  if (details) {
    query.details = details;
  }

  return query;
}

async function redirectHome(query: Record<string, string>): Promise<void> {
  const locale = getValidLocale(await getLocale());

  redirect({
    href: { pathname: '/', query },
    locale,
  });
}

export async function searchAction(
  _prevState: null,
  formData: FormData
): Promise<null> {
  const search = getField(formData, 'search').trim();
  const cookieStore = await cookies();

  if (search) {
    cookieStore.set(SEARCH_STORAGE_KEY, search, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  } else {
    cookieStore.delete(SEARCH_STORAGE_KEY);
  }

  const query = buildHomeQuery({ page: '1' });

  if (search) {
    query.name = search;
  }

  await redirectHome(query);
  return null;
}

export async function selectDetailsAction(formData: FormData): Promise<void> {
  const detailsId = getField(formData, 'detailsId');
  const name = getField(formData, 'name');
  const page = getField(formData, 'page') || '1';

  const query = buildHomeQuery({ name, page, details: detailsId });

  await redirectHome(query);
}

export async function clearDetailsAction(formData: FormData): Promise<void> {
  const name = getField(formData, 'name');
  const page = getField(formData, 'page') || '1';

  await redirectHome(buildHomeQuery({ name, page }));
}
