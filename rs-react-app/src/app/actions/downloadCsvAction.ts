'use server';

import { buildCsv, getCsvFilename } from '@/shared/buildCsv';
import type { Character } from '@/shared/types';

type DownloadCsvResult =
  | { ok: true; csv: string; filename: string }
  | { ok: false; error: string };

export async function downloadCsvAction(
  characters: Character[]
): Promise<DownloadCsvResult> {
  if (characters.length === 0) {
    return await Promise.resolve({
      ok: false,
      error: 'No characters selected',
    });
  }

  return await Promise.resolve({
    ok: true,
    csv: buildCsv(characters),
    filename: getCsvFilename(characters.length),
  });
}
