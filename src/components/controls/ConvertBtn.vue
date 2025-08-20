<template>
  <button
    class="btn"
    :disabled="!store.hasFile || store.loading"
    @click="convert"
    aria-label="Convert and download"
  >
    {{ store.loading ? 'Converting…' : 'Convert & Download' }}
  </button>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/store/audio'
import { transcode } from '@/composables/useFFmpeg'
import { saveBlob } from '@/utils/downloadHelpers'
import { FORMAT_OPTIONS } from '@/data/formatOptions'

const store = useAudioStore()

async function convert() {
  if (!store.file) return

  try {
    store.setLoading(true)
    store.setProgress(0)

    const data = await transcode(
      store.file,
      {
        format: store.format,
        bitrateKbps: store.bitrateKbps,
        gainDb: store.gainDb
      },
      p => store.setProgress(p)
    )

    const mime =
      FORMAT_OPTIONS.find(o => o.value === store.format)?.mime || 'audio/*'
    saveBlob(
      new Blob([data], { type: mime }),
      store.file.name.replace(/\.[^.]+$/, ''),
      store.format,
      mime
    )
  } catch (err) {
    console.error(err)
    store.setError((err as Error).message)
  } finally {
    store.setLoading(false)
    store.setProgress(0)
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
  min-width: 160px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid $TEXT_COLOR;
  }
}
</style>
