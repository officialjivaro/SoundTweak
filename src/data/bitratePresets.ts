/**
 * Common constant bit‑rate presets (in kbps) shown in <BitrateSelect>.
 * Lossless formats ignore this value.
 */
export const BITRATE_PRESETS_KBPS = [64, 96, 128, 160, 192, 256, 320] as const;

export type BitratePreset = typeof BITRATE_PRESETS_KBPS[number];
