import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

class LocalStorageMock {
  private store = new Map<string, string>();

  clear() {
    this.store.clear();
  }

  getItem(key: string) {
    const value = this.store.get(key);
    return value ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  removeItem(key: string) {
    this.store.delete(key);
  }
}

globalThis.localStorage = new LocalStorageMock() as unknown as Storage;

afterEach(() => {
  localStorage.clear();
});
