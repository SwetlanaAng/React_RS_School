import { act, renderHook } from '@testing-library/react';
import { useStorage } from '@/hooks/useStorage';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = '';
  });

  it('saves and reads search from localStorage', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.saveSearch('Rick');
    });

    expect(result.current.getSearch()).toBe('Rick');
    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('Rick');
    expect(document.cookie).toContain(`${SEARCH_STORAGE_KEY}=Rick`);
  });

  it('clears stored search when value is empty', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.saveSearch('Rick');
      result.current.saveSearch('');
    });

    expect(result.current.getSearch()).toBe('');
    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('');
  });
});
