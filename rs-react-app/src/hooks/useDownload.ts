import type { Character } from '../shared/types';
import { buildCsv, getCsvFilename } from '../shared/buildCsv';
import { triggerCsvDownload } from '../shared/triggerCsvDownload';

export function useDownload() {
  const download = (characters: Character[], selectedAmount: number) => {
    triggerCsvDownload(buildCsv(characters), getCsvFilename(selectedAmount));
  };

  return { download };
}
