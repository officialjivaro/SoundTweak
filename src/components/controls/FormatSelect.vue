// src/components/controls/FormatSelect.vue
<template>
  <select
    class="select"
    v-model="current"
    aria-label="Output format"
  >
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioStore } from '@/store/audio';
import { FORMAT_OPTIONS } from '@/data/formatOptions';

const store = useAudioStore();
const options = FORMAT_OPTIONS;

const current = computed({
  get: () => store.format,
  set: value => store.setFormat(value)
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
