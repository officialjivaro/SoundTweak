/**
 * List of export container / codec options surfaced in <FormatSelect>.
 * The value string matches the extension passed to FFmpeg (e.g. "-f mp3").
 */
export interface FormatOption {
  label: string;   // Human‑readable (UI)
  value: string;   // Extension / FFmpeg format flag
  mime: string;    // Browser MIME for download
}

export const FORMAT_OPTIONS: FormatOption[] = [
  { label: 'MP3 (MPEG‑1 Layer III)', value: 'mp3', mime: 'audio/mpeg' },
  { label: 'AAC / M4A',             value: 'm4a', mime: 'audio/mp4' },
  { label: 'WAV (PCM 16‑bit)',      value: 'wav', mime: 'audio/wav' },
  { label: 'FLAC (lossless)',       value: 'flac', mime: 'audio/flac' },
  { label: 'OGG (Vorbis)',          value: 'ogg', mime: 'audio/ogg' }
];
