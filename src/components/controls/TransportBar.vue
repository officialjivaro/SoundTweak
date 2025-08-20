// src/components/controls/TransportBar.vue
<template>
  <div class="bar">
    <button
      class="btn"
      :disabled="!store.hasFile"
      @click="toggle"
      aria-label="Play or pause"
    >
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
    <button
      class="btn"
      :disabled="!store.hasFile"
      @click="stop"
      aria-label="Stop"
    >
      Stop
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { useAudioStore } from '@/store/audio';

const player = useAudioPlayer();
const store = useAudioStore();

const isPlaying = computed(() => player.isPlaying.value);

function toggle() {
  isPlaying.value ? player.pause() : player.play();
}
function stop() {
  player.stop();
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.bar {
  display: flex;
  gap: $SPACING_SM;
}

.btn {
  padding: $SPACING_SM $SPACING_MD;
  border: none;
  border-radius: $RADIUS_SM;
  background: $ACCENT_COLOR;
  color: $BACKGROUND_MAIN;
  cursor: pointer;
  font-weight: 600;
  min-width: 72px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid $TEXT_COLOR;
  }
}
</style>
