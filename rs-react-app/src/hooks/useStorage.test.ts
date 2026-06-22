import { act, renderHook } from '@testing-library/react';
import { useStorage } from '@/hooks/useStorage';
import { SEARCH_STORAGE_KEY } from '@/shared/searchStorage';

describe('useStorage', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('saves search to cookie', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.saveSearch('Rick');
    });

    expect(document.cookie).toContain(`${SEARCH_STORAGE_KEY}=Rick`);
  });

  it('clears search cookie when value is empty', () => {
    const { result } = renderHook(() => useStorage());

    act(() => {
      result.current.saveSearch('Rick');
      result.current.saveSearch('');
    });

    expect(document.cookie).not.toContain(`${SEARCH_STORAGE_KEY}=Rick`);
  });
});
