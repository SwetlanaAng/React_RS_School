export class storageService {
    private readonly STORAGE_KEY = 'search';
    public saveSearch(search: string) {
      localStorage.setItem(this.STORAGE_KEY, search);
    }
    public getSearch(): string {
      return localStorage.getItem(this.STORAGE_KEY);
    }
  }
  