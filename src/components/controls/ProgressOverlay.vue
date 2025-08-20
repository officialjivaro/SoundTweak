// src/components/controls/ProgressOverlay.vue
<template>
  <div v-if="store.loading" class="overlay" role="alert" aria-live="assertive">
    <div class="box">
      <p class="label">Processing…</p>
      <div class="bar">
        <div class="fill" :style="{ width: pct + '%' }" />
      </div>
      <p class="percent">{{ pct.toFixed(0) }}%</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioStore } from '@/store/audio';

const store = useAudioStore();
const pct = computed(() => store.progress * 100);
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.box {
  background: $GROUP_DEFAULT;
  padding: $SPACING_LG;
  border-radius: $RADIUS_MD;
  box-shadow: $ELEVATION_SHADOW;
  width: 280px;
  text-align: center;
}

.label {
  margin: 0 0 $SPACING_MD;
}

.bar {
  height: 8px;
  background: $GROUP_HOVER;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: $ACCENT_COLOR;
  transition: width 0.2s linear;
}

.percent {
  margin-top: $SPACING_SM;
  font-variant-numeric: tabular-nums;
}
</style>
