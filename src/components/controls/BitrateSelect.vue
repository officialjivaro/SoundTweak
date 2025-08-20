// src/components/controls/BitrateSelect.vue
<template>
  <select
    class="select"
    v-model="current"
    aria-label="Bit‑rate (kbps)"
  >
    <option :value="null">Original / Lossless</option>
    <option
      v-for="rate in presets"
      :key="rate"
      :value="rate"
    >
      {{ rate }} kbps
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioStore } from '@/store/audio';
import { BITRATE_PRESETS_KBPS } from '@/data/bitratePresets';

const store = useAudioStore();
const presets = BITRATE_PRESETS_KBPS;

const current = computed<number | null>({
  get: () => store.bitrateKbps,
  set: (val) => {
    if (val === null) {
      store.setBitrate(null);
    } else {
      store.setBitrate(Number(val));
    }
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.select {
  appearance: none;
  padding: $SPACING_SM $SPACING_MD;
  border-radius: $RADIUS_SM;
  background: $GROUP_DEFAULT;
  color: $TEXT_COLOR;
  border: 1px solid $GROUP_HOVER;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid $ACCENT_COLOR;
  }
}
</style>
