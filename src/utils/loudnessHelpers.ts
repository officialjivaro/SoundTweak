/**
 * Maths helpers for gain / dB conversions.
 */

/** Convert a linear gain factor to **dBFS**. */
export function gainToDb(gain: number): number {
  return 20 * Math.log10(gain);
}

/** Convert **dBFS** to a linear gain factor. */
export function dbToGain(db: number): number {
  return Math.pow(10, db / 20);
}

/**
 * Clamp a numeric value between the provided min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
