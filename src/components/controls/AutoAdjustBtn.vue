// src/components/controls/AutoAdjustBtn.vue
<template>
  <button
    class="btn"
    :disabled="!store.hasFile || store.loading"
    @click="autoAdjust"
    aria-label="Auto adjust loudness"
  >
    {{ store.loading ? 'Analysing…' : 'Auto Adjust' }}
  </button>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/store/audio';
import { analyseFile } from '@/composables/useLoudness';

const store = useAudioStore();

async function autoAdjust() {
  if (!store.file) return;
  try {
    store.setLoading(true);
    const { integratedLufs, truePeakDbTP, gainDb } = await analyseFile(store.file);
    // update metadata
    if (store.meta)
      store.setMeta({ ...store.meta, loudnessLUFS: integratedLufs, truePeakDbTP });
    else
      store.setMeta({
        // minimal meta when probe() not yet run
        name: store.file.name,
        duration: 0,
        sampleRate: 0,
        channels: 0,
        container: '',
        codec: '',
        bitrateKbps: null,
        loudnessLUFS: integratedLufs,
        truePeakDbTP
      });
    store.setGainDb(gainDb);
  } catch (err) {
    store.setError((err as Error).message);
  } finally {
    store.setLoading(false);
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.btn {
  padding: $SPACING_SM $SPACING_MD;
  border: none;
  border-radius: $RADIUS_SM;
  background: $ACCENT_COLOR;
  color: $BACKGROUND_MAIN;
  cursor: pointer;
  font-weight: 600;
  min-width: 120px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid $TEXT_COLOR;
  }
}
</style>
