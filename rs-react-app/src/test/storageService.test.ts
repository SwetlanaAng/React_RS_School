import { useStorage } from '../hooks/useStorage';

describe('useStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves search to localStorage', () => {
    const { saveSearch } = useStorage();
    saveSearch('Rick Sanchez');
    expect(localStorage.getItem('search')).toBe('Rick Sanchez');
  });

  it('gets search from localStorage', () => {
    const { getSearch } = useStorage();
    localStorage.setItem('search', 'Rick Sanchez');
    const search = getSearch();
    expect(search).toBe('Rick Sanchez');
  });
});
