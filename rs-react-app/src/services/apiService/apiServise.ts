export class ApiService {
    private readonly BASE_URL = 'https://rickandmortyapi.com/api';
    public async getAllCharacters(){
        try {
          const res = await fetch(`${this.BASE_URL}/character`);  
          const characters = await res.json();
          const t = 1;
          return characters;
        } catch {
            throw new Error('Failed to fetch characters');
        }
    }
}