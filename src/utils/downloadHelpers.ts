import { sanitizeFilename } from './fileHelpers';

/**
 * Trigger a browser download for the supplied Blob, preserving the
 * original base name and using the selected extension.
 *
 * @param blob      Encoded audio data
 * @param baseName  Original file name (without extension)
 * @param ext       Target extension (e.g. "mp3")
 * @param mimeType  MIME type used to create the Blob URL
 */
export function saveBlob(
  blob: Blob,
  baseName: string,
  ext: string,
  mimeType: string
): void {
  const url = URL.createObjectURL(new Blob([blob], { type: mimeType }));
  const link = document.createElement('a');

  link.href = url;
  link.download = sanitizeFilename(`${baseName}.${ext}`);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
}
