import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  it('resolves with a data URL for a valid file', async () => {
    const file = new File(['hello'], 'test.png', { type: 'image/png' });

    const result = await fileToBase64(file);

    expect(result).toMatch(/^data:image\/png;base64,/);
  });

  it('rejects when FileReader fails', async () => {
    vi.spyOn(window, 'FileReader').mockImplementation(function () {
      const reader = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        error: new Error('read failed'),
        readAsDataURL() {
          queueMicrotask(() => {
            reader.onerror?.();
          });
        },
      };

      return reader as unknown as FileReader;
    });

    const file = new File(['hello'], 'test.png', { type: 'image/png' });

    await expect(fileToBase64(file)).rejects.toThrow('read failed');
  });
});
