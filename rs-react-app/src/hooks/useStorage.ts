'use client';

import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

export function useStorage() {
  function saveSearch(search: string) {
    if (search) {
      document.cookie = `${SEARCH_STORAGE_KEY}=${encodeURIComponent(search)}; path=/; max-age=31536000; SameSite=Lax`;
    } else {
      document.cookie = `${SEARCH_STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
    }
  }

  return { saveSearch };
}
