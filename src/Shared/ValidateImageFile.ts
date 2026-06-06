export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

export function validateImageFile(
  file: File | null | undefined
): string | null {
  if (!file || file.size === 0) {
    return 'Image is required';
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Only PNG and JPEG images are allowed';
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return 'Image must be smaller than 5 MB';
  }

  return null;
}
