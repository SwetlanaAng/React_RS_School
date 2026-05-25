import type { Character } from '../shared/types';

export function useDownload() {
  const stringifyCsvValue = (value: Character[keyof Character]): string => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const isCharacterKey = (
    character: Character,
    header: string
  ): header is keyof Character => header in character;

  const makeString = (characters: Character[]): string => {
    const headers = Object.keys(characters[0]);

    const csvRows = [
      ...characters.map((character) =>
        headers
          .map((header) => {
            if (isCharacterKey(character, header)) {
              return stringifyCsvValue(character[header]);
            }

            return '';
          })
          .join(',')
      ),
    ];

    return csvRows.join('\n');
  };
  const download = (characters: Character[], selectedAmount: number) => {
    const blob = new Blob([makeString(characters)], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${String(selectedAmount)}_items.csv`;

    a.click();

    URL.revokeObjectURL(url);
  };
  return { download };
}
