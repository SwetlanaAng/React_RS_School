import type { ResponseCharacter } from "../../shared/types";

export class ApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';
  public async getAllCharacters(): Promise<ResponseCharacter> {
    try {
      const res = await fetch(`${this.BASE_URL}/character`);
      const characters = await res.json();
      console.log(characters)
      return characters;
    } catch {
      throw new Error('Failed to fetch characters');
    }
  }
}
