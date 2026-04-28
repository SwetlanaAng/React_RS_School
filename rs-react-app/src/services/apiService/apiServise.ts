import type { Character } from '../../shared/types';
import { storageService } from '../storageService/storageService';

export class ApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';
  
  public async getCharacters(): Promise<Character[]> {
    try {
        const search = storageService.getSearch();
        let url = `${this.BASE_URL}/character`
        if(search) {
            url += `?name=${search}`;
        } 
      const res = await fetch(url);
      const characters = await res.json();
      console.log(characters);
      return characters.results;
    } catch {
      throw new Error('Failed to fetch characters');
    }
  }
}
