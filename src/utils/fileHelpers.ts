/**
 * Utility helpers for working with File / Blob objects.
 */

/**
 * Extract the **lower‑case extension** (excluding dot) from a File name.
 * Returns an empty string when no extension exists.
 */
export function getExtension(fileName: string): string {
  const idx = fileName.lastIndexOf('.');
  return idx === -1 ? '' : fileName.slice(idx + 1).toLowerCase();
}

/**
 * Replace the extension of a file name (or append one if none exists).
 */
export function replaceExtension(fileName: string, newExt: string): string {
  const safeExt = newExt.startsWith('.') ? newExt.slice(1) : newExt;
  const idx = fileName.lastIndexOf('.');
  return (idx === -1 ? fileName : fileName.slice(0, idx)) + `.${safeExt}`;
}

/**
 * Ensure a file name is safe for downloads (remove path separators etc.).
 */
export function sanitizeFilename(fileName: string): string {
  return fileName.replace(/[/\\?%*:|"<>]/g, '_');
}
