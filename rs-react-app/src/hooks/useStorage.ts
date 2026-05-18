export function useStorage() {
  const STORAGE_KEY = 'search';
  function saveSearch(search: string) {
    localStorage.setItem(STORAGE_KEY, search);
  }
  function getSearch(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }
  return { saveSearch, getSearch };
}
