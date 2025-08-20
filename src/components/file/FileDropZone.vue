// src/components/file/FileDropZone.vue
<template>
  <label
    class="drop-zone"
    :class="{ dragging }"
    @dragenter.prevent="onDrag(true)"
    @dragover.prevent
    @dragleave.prevent="onDrag(false)"
    @drop.prevent="onDrop"
  >
    <input
      class="visually-hidden"
      type="file"
      accept="audio/*"
      @change="onBrowse"
    />
    <p>{{ labelText }}</p>
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAudioStore } from '@/store/audio';

const store = useAudioStore();
const dragging = ref(false);

const labelText = computed(() =>
  store.hasFile ? 'Drop to replace or click to browse' : 'Drag & drop or click to browse'
);

function onDrag(flag: boolean) {
  dragging.value = flag;
}

function handleFile(file: File) {
  if (file) {
    store.reset();
    store.setFile(file);
  }
}

function onBrowse(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) handleFile(files[0]);
}

function onDrop(event: DragEvent) {
  dragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) handleFile(file);
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.drop-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $SPACING_LG;
  min-height: 160px;
  border: 2px dashed $GROUP_DEFAULT;
  border-radius: $RADIUS_MD;
  background: $INSTANCE_DEFAULT;
  text-align: center;
  cursor: pointer;
  transition: border-color 150ms ease-in-out, background 150ms ease-in-out;

  &.dragging {
    border-color: $ACCENT_COLOR;
    background: $GROUP_HOVER;
  }

  p {
    margin: 0;
    user-select: none;
  }
}
</style>
