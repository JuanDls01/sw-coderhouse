import { TRANSFORM_CONFIG } from './consts';

/**
 * Validates if a data URL has a valid image MIME type prefix
 */
export function isValidImageDataUrl(dataUrl: string): boolean {
  return TRANSFORM_CONFIG.ALLOWED_MIME_TYPES.some((type) => dataUrl.startsWith(`data:${type}`));
}

/**
 * Calculates the approximate size in bytes of a base64 encoded string
 */
export function getBase64SizeBytes(base64: string): number {
  const base64Data = base64.split(',')[1] || base64;
  return Math.ceil((base64Data.length * 3) / 4);
}

/**
 * Validates image file on the client side
 * Returns error message if invalid, null if valid
 */
export function validateImageFile(file: File): string | null {
  if (
    !TRANSFORM_CONFIG.ALLOWED_MIME_TYPES.includes(
      file.type as (typeof TRANSFORM_CONFIG.ALLOWED_MIME_TYPES)[number],
    )
  ) {
    return 'Formato no válido. Usa JPEG, PNG, WebP o GIF.';
  }

  if (file.size > TRANSFORM_CONFIG.MAX_IMAGE_SIZE_BYTES) {
    return `La imagen es muy grande. Máximo ${TRANSFORM_CONFIG.MAX_IMAGE_SIZE_MB}MB.`;
  }

  return null;
}

/**
 * Validates image data URL on the server side
 * Returns error message if invalid, null if valid
 */
export function validateImageDataUrl(dataUrl: unknown): string | null {
  if (typeof dataUrl !== 'string') {
    return 'Formato de imagen inválido.';
  }

  if (!isValidImageDataUrl(dataUrl)) {
    return 'Formato de imagen inválido. Usa JPEG, PNG, WebP o GIF.';
  }

  if (getBase64SizeBytes(dataUrl) > TRANSFORM_CONFIG.MAX_IMAGE_SIZE_BYTES) {
    return `La imagen es muy grande. Máximo ${TRANSFORM_CONFIG.MAX_IMAGE_SIZE_MB}MB.`;
  }

  return null;
}
