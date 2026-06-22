import { buildCsv, getCsvFilename } from '@/shared/buildCsv';
import { mockCharacters } from '@/test/mockCharacters';

describe('buildCsv', () => {
  it('returns empty string for empty input', () => {
    expect(buildCsv([])).toBe('');
  });

  it('builds csv rows from characters', () => {
    const csv = buildCsv(mockCharacters);

    expect(csv).toContain('Rick Sanchez');
    expect(csv).toContain('Morty Smith');
    expect(csv.split('\n')).toHaveLength(2);
  });

  it('generates filename from selected amount', () => {
    expect(getCsvFilename(3)).toBe('3_items.csv');
  });
});
