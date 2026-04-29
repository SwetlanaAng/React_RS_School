export class storageService {
  private static readonly STORAGE_KEY = 'search';
  public saveSearch(search: string) {
    localStorage.setItem(storageService.STORAGE_KEY, search);
  }
  public static getSearch(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
