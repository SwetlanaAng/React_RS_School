import type { Character } from '../shared/types';

export function useDownload() {
  const stringifyCsvValue = (value: Character[keyof Character]): string => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const escapeCsvValue = (value: string): string => {
    if (/[",\n\r]/.test(value)) {
      return `"${value.replaceAll('"', '""')}"`;
    }

    return value;
  };

  const makeString = (characters: Character[]): string => {
    if (characters.length === 0) {
      return '';
    }
    const headers = Object.keys(characters[0]) as (keyof Character)[];

    const csvRows = [
      headers.join(','),
      ...characters.map((character) =>
        headers
          .map((header) => escapeCsvValue(stringifyCsvValue(character[header])))
          .join(',')
      ),
    ];

    return csvRows.join('\n');
  };

  const download = (characters: Character[], selectedAmount: number) => {
    if (selectedAmount === 0 || characters.length === 0) {
      return;
    }
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
