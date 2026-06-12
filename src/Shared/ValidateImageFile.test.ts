import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  validateImageFile,
} from './ValidateImageFile';

function createFile(
  name: string,
  type: string,
  size: number,
  content = 'image-data'
): File {
  const file = new File([content], name, { type });

  Object.defineProperty(file, 'size', { value: size });

  return file;
}

describe('ValidateImageFile', () => {
  it('exports allowed types and max size', () => {
    expect(ALLOWED_IMAGE_TYPES).toEqual(['image/png', 'image/jpeg']);
    expect(MAX_IMAGE_SIZE).toBe(5 * 1024 * 1024);
  });

  it('returns error when file is missing or empty', () => {
    expect(validateImageFile(null)).toBe('Image is required');
    expect(validateImageFile(undefined)).toBe('Image is required');
    expect(validateImageFile(createFile('empty.png', 'image/png', 0))).toBe(
      'Image is required'
    );
  });

  it('returns error for unsupported mime type', () => {
    const file = createFile('photo.gif', 'image/gif', 100);

    expect(validateImageFile(file)).toBe(
      'Only PNG and JPEG images are allowed'
    );
  });

  it('returns error when file exceeds max size', () => {
    const file = createFile('large.png', 'image/png', MAX_IMAGE_SIZE + 1);

    expect(validateImageFile(file)).toBe('Image must be smaller than 5 MB');
  });

  it('returns null for valid png and jpeg files', () => {
    const png = createFile('photo.png', 'image/png', 1024);

    const jpeg = createFile('photo.jpg', 'image/jpeg', 2048);

    expect(validateImageFile(png)).toBeNull();
    expect(validateImageFile(jpeg)).toBeNull();
  });
});
