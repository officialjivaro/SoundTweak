import { LOUDNESS_TARGET_LUFS, TRUE_PEAK_CEILING_DBTP } from '@/data/constants';

/**
 * Very lightweight LUFS estimator: we use RMS over full signal length
 * as an approximation (not 100 % ITU‑R BS.1770 accurate, but good enough
 * for demonstration and keeps bundle size down).
 */
export async function analyseFile(file: File): Promise<{
  integratedLufs: number;
  truePeakDbTP: number;
  gainDb: number;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const audioCtx = new OfflineAudioContext(2, 1, 44100);
  const decoded = await audioCtx.decodeAudioData(arrayBuffer);

  const { numberOfChannels, length, sampleRate } = decoded;
  const samples = numberOfChannels === 1
    ? decoded.getChannelData(0)
    : mixToMono(decoded);

  // RMS
  let rms = 0;
  for (let i = 0; i < samples.length; i++) rms += samples[i] ** 2;
  rms = Math.sqrt(rms / samples.length);
  const lufs = 20 * Math.log10(rms) - 0.691; // rough offset to match LUFS

  // True peak
  let peak = 0;
  for (let i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
  const peakDbTP = 20 * Math.log10(peak);

  // Compute gain needed to reach target LUFS without exceeding peak ceiling
  const gainToTarget = LOUDNESS_TARGET_LUFS - lufs;
  const headroom = TRUE_PEAK_CEILING_DBTP - peakDbTP;
  const gainDb = Math.min(gainToTarget, headroom);

  return { integratedLufs: lufs, truePeakDbTP: peakDbTP, gainDb };
}

function mixToMono(buffer: AudioBuffer): Float32Array {
  const len = buffer.length;
  const mono = new Float32Array(len);
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < len; i++) mono[i] += data[i];
  }
  for (let i = 0; i < len; i++) mono[i] /= buffer.numberOfChannels;
  return mono;
}
