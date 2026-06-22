import { triggerCsvDownload } from '@/shared/triggerCsvDownload';

describe('triggerCsvDownload', () => {
  it('creates a temporary download link and clicks it', () => {
    const clickMock = vi.fn();
    const createObjectURLMock = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:csv');
    const revokeObjectURLMock = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => undefined);

    const link = document.createElement('a');
    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(link);
    link.click = clickMock;

    triggerCsvDownload('id,name\n1,Rick', 'characters.csv');

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(link.download).toBe('characters.csv');
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:csv');
  });
});
