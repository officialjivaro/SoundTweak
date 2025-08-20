import { ref, watch, computed } from 'vue';
import { useAudioStore } from '@/store/audio';
import { dbToGain } from '@/utils/loudnessHelpers';

/**
 * Singleton composable that manages playback through Web Audio.
 * ‑ Creates an <audio> element from the selected File
 * ‑ Pipes it into an AudioContext → GainNode (for dynamic gain)
 * ‑ Exposes reactive state + control helpers to UI components
 */
const audioEl = new Audio();
audioEl.preload = 'auto';

const ctx = new AudioContext();
const source = ctx.createMediaElementSource(audioEl);
const gainNode = ctx.createGain();
source.connect(gainNode).connect(ctx.destination);

const store = useAudioStore();

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

/* ---------- Reactivity ---------- */
audioEl.addEventListener('timeupdate', () => (currentTime.value = audioEl.currentTime));
audioEl.addEventListener('loadedmetadata', () => (duration.value = audioEl.duration));
audioEl.addEventListener('play', () => (isPlaying.value = true));
audioEl.addEventListener('pause', () => (isPlaying.value = false));
audioEl.addEventListener('ended', () => (isPlaying.value = false));

/* watch file selection → create object URL */
let objectUrl: string | null = null;
watch(
  () => store.file,
  file => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    if (file) {
      objectUrl = URL.createObjectURL(file);
      audioEl.src = objectUrl;
      audioEl.load();
    } else {
      audioEl.removeAttribute('src');
    }
  }
);

/* watch gain (dB) changes */
watch(
  () => store.gainDb,
  db => (gainNode.gain.value = dbToGain(db))
);

/* ---------- Controls ---------- */
function play() {
  if (ctx.state !== 'running') ctx.resume();
  audioEl.play();
}
function pause() {
  audioEl.pause();
}
function stop() {
  audioEl.pause();
  audioEl.currentTime = 0;
}
function seek(sec: number) {
  audioEl.currentTime = sec;
}

export function useAudioPlayer() {
  return {
    isPlaying: computed(() => isPlaying.value),
    currentTime,
    duration: computed(() => duration.value),
    play,
    pause,
    stop,
    seek
  };
}
