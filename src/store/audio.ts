import { defineStore } from 'pinia';
import type { AudioMeta } from '@/types/AudioMeta';
import { LOUDNESS_TARGET_LUFS } from '@/data/constants';
import { FORMAT_OPTIONS, type FormatOption } from '@/data/formatOptions';

export interface AudioState {
  file: File | null;
  fileName: string | null;
  meta: AudioMeta | null;
  gainDb: number;
  format: string;
  bitrateKbps: number | null;
  progress: number;
  loading: boolean;
  error: string | null;
}

export const useAudioStore = defineStore('audio', {
  state: (): AudioState => ({
    file: null,
    fileName: null,
    meta: null,
    gainDb: 0,
    format: 'wav',
    bitrateKbps: null,
    progress: 0,
    loading: false,
    error: null
  }),

  getters: {
    hasFile: state => state.file !== null,
    loudnessDelta: state =>
      state.meta ? LOUDNESS_TARGET_LUFS - state.meta.loudnessLUFS : 0
  },

  actions: {
    reset() {
      this.$reset();
    },
    setFile(file: File) {
      this.file = file;
      this.fileName = file.name;
      this.error = null;
      this.progress = 0;

      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const match = FORMAT_OPTIONS.find(
        (o: FormatOption) => o.value === ext
      );
      if (match) this.format = match.value;
    },
    setMeta(meta: AudioMeta) {
      this.meta = meta;
      if (meta.bitrateKbps) this.bitrateKbps = meta.bitrateKbps;
    },
    setGainDb(value: number) {
      this.gainDb = value;
    },
    setFormat(fmt: string) {
      this.format = fmt;
    },
    setBitrate(kbps: number | null) {
      this.bitrateKbps = kbps;
    },
    setProgress(value: number) {
      this.progress = value;
    },
    setLoading(flag: boolean) {
      this.loading = flag;
    },
    setError(message: string | null) {
      this.error = message;
    }
  }
});
