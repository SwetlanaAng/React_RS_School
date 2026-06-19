'use client';

import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

export function useStorage() {
  function saveSearch(search: string) {
    localStorage.setItem(SEARCH_STORAGE_KEY, search);

    if (search) {
      document.cookie = `${SEARCH_STORAGE_KEY}=${encodeURIComponent(search)}; path=/; max-age=31536000; SameSite=Lax`;
    } else {
      document.cookie = `${SEARCH_STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
    }
  }

  function getSearch(): string | null {
    return localStorage.getItem(SEARCH_STORAGE_KEY);
  }

  return { saveSearch, getSearch };
}
