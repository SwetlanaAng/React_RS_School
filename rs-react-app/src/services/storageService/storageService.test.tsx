import { storageService } from './storageService';

describe('storageService', () => {
    beforeEach(() => {
        localStorage.clear();
      });
    it('saves search to localStorage', () => {
        const service = new storageService()
        service.saveSearch('Rick Sanchez');
        expect(localStorage.getItem('search')).toBe('Rick Sanchez');
    })
    it('gets search from localStorage', () => {
        localStorage.setItem('search','Rick Sanchez');
        expect(storageService.getSearch()).toBe('Rick Sanchez');
    })
})