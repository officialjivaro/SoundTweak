/**
 * Parameters passed to FFmpeg when the user hits “Convert”.
 */
export interface EncodingOptions {
  /** Container / codec format flag (matches a <FormatSelect> value) */
  format: string;
  /** Constant bit‑rate in kbps, or null to keep original / use lossless */
  bitrateKbps: number | null;
  /** Gain (in dB) to reach the −14 LUFS target before encoding */
  gainDb: number;
}
