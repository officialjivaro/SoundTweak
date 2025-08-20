// src/components/controls/SeekSlider.vue
<template>
  <div class="seek-wrap" v-if="duration > 0">
    <input
      type="range"
      class="seek"
      :max="duration"
      step="0.01"
      v-model.number="pos"
      aria-label="Seek position"
    />
    <span class="time">{{ formatTime(pos) }} / {{ formatTime(duration) }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioPlayer } from '@/composables/useAudioPlayer';

const { currentTime, duration, seek } = useAudioPlayer();

const pos = computed({
  get: () => currentTime.value,
  set: v => seek(v)
});

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.seek-wrap {
  display: flex;
  align-items: center;
  gap: $SPACING_SM;
}

.seek {
  flex: 1;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: $GROUP_HOVER;
  cursor: pointer;

  &::-webkit-slider-thumb,
  &::-moz-range-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $ACCENT_COLOR;
    border: none;
  }
}

.time {
  min-width: 80px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
