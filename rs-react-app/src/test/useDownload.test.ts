import { renderHook } from '@testing-library/react';
import { mockCharacters } from './mockCharacters';
import { useDownload } from '../hooks/useDownload';

describe('useDownload', () => {
  let anchor: HTMLAnchorElement;
  let createObjectURLMock: ReturnType<typeof vi.fn<(blob: Blob) => string>>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn<(url: string) => void>>;
  let clickMock: ReturnType<typeof vi.fn<() => void>>;
  let createElementMock: ReturnType<
    typeof vi.fn<(tagName: string) => HTMLElement>
  >;

  beforeEach(() => {
    anchor = document.createElement('a');
    createObjectURLMock = vi.fn<(blob: Blob) => string>(() => 'blob:mock-url');
    revokeObjectURLMock = vi.fn<(url: string) => void>();
    clickMock = vi.fn<() => void>();
    createElementMock = vi.fn<(tagName: string) => HTMLElement>(() => anchor);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) =>
      createElementMock(tagName)
    );
    vi.spyOn(anchor, 'click').mockImplementation(() => {
      clickMock();
    });

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURLMock,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURLMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('downloads selected characters with native browser APIs', () => {
    const { result } = renderHook(() => useDownload());

    result.current.download(mockCharacters, mockCharacters.length);

    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(createElementMock).toHaveBeenCalledWith('a');
    expect(anchor.href).toBe('blob:mock-url');
    expect(anchor.download).toBe('2_items.csv');
    expect(clickMock).toHaveBeenCalledOnce();
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');
  });

  it('creates a CSV blob with selected character details', async () => {
    const { result } = renderHook(() => useDownload());

    result.current.download(mockCharacters, mockCharacters.length);

    const blob = createObjectURLMock.mock.calls[0][0];
    const csv = await blob.text();

    expect(blob.type).toBe('text/csv;charset=utf-8;');
    expect(csv).toContain('Rick Sanchez');
    expect(csv).toContain('Morty Smith');
    expect(csv).toContain('https://rickandmortyapi.com/api/character/1');
    const originJson = JSON.stringify(mockCharacters[0].origin);
    const escapedOrigin = `"${originJson.replaceAll('"', '""')}"`;
    expect(csv).toContain(escapedOrigin);
  });
});
