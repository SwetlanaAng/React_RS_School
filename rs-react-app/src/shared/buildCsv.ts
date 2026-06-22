import type { Character } from '@/shared/types';

function stringifyCsvValue(value: Character[keyof Character]): string {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function isCharacterKey(
  character: Character,
  header: string
): header is keyof Character {
  return header in character;
}

export function buildCsv(characters: Character[]): string {
  if (characters.length === 0) {
    return '';
  }

  const headers = Object.keys(characters[0]);

  const csvRows = characters.map((character) =>
    headers
      .map((header) => {
        if (isCharacterKey(character, header)) {
          return stringifyCsvValue(character[header]);
        }

        return '';
      })
      .join(',')
  );

  return csvRows.join('\n');
}

export function getCsvFilename(selectedAmount: number): string {
  return `${String(selectedAmount)}_items.csv`;
}
