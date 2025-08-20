// src/components/controls/VolumeSlider.vue
<template>
  <div class="slider-wrap">
    <input
      type="range"
      class="slider"
      :min="minDb"
      :max="maxDb"
      step="0.1"
      v-model.number="gainDb"
      aria-label="Volume gain in decibels"
    />
    <span class="value">{{ gainDb.toFixed(1) }} dB</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioStore } from '@/store/audio';

const minDb = -24;
const maxDb = 24;

const store = useAudioStore();

const gainDb = computed({
  get: () => store.gainDb,
  set: val => store.setGainDb(val)
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.slider-wrap {
  display: flex;
  align-items: center;
  gap: $SPACING_SM;
}

.slider {
  flex: 1;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: $GROUP_HOVER;
  cursor: pointer;
  transition: background 0.2s;
  &:focus-visible {
    outline: 2px solid $ACCENT_COLOR;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $ACCENT_COLOR;
    animation: slider-bump 0.3s ease-out;
    border: none;
  }
  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $ACCENT_COLOR;
    animation: slider-bump 0.3s ease-out;
    border: none;
  }
}

.value {
  min-width: 64px;
  text-align: right;
}
</style>
