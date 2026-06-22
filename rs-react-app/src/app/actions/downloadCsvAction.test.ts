import { downloadCsvAction } from '@/app/actions/downloadCsvAction';
import { mockCharacters } from '@/test/mockCharacters';

describe('downloadCsvAction', () => {
  it('returns error when no characters are selected', async () => {
    await expect(downloadCsvAction([])).resolves.toEqual({
      ok: false,
      error: 'No characters selected',
    });
  });

  it('returns csv content and filename for selected characters', async () => {
    const result = await downloadCsvAction(mockCharacters);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.filename).toBe('2_items.csv');
      expect(result.csv).toContain('Rick Sanchez');
      expect(result.csv).toContain('Morty Smith');
    }
  });
});
