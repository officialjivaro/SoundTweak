SoundTweak/src/components/layout/MainLayout.vue

```vue
<template>
  <div class="wrapper">
    <main class="layout" :class="{ mobile: isMobile }">
      <section class="import">
        <FileDropZone />
        <p v-if="store.hasFile" class="file-msg">
          File loaded: <strong>{{ store.fileName }}</strong>
        </p>
      </section>

      <section class="controls" :class="{ mobile: isMobile }">
        <TransportBar />
        <SeekSlider />
        <VolumeSlider />

        <div class="format-row" :class="{ mobile: isMobile }">
          <FormatSelect />
          <BitrateSelect />
        </div>

        <div class="action-row" :class="{ mobile: isMobile }">
          <AutoAdjustBtn />
          <ConvertBtn />
        </div>
      </section>

      <ProgressOverlay />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useResponsive } from '@/composables/useResponsive'
import { useAudioStore } from '@/store/audio'

import FileDropZone from '@/components/file/FileDropZone.vue'
import TransportBar from '@/components/controls/TransportBar.vue'
import SeekSlider from '@/components/controls/SeekSlider.vue'
import VolumeSlider from '@/components/controls/VolumeSlider.vue'
import FormatSelect from '@/components/controls/FormatSelect.vue'
import BitrateSelect from '@/components/controls/BitrateSelect.vue'
import AutoAdjustBtn from '@/components/controls/AutoAdjustBtn.vue'
import ConvertBtn from '@/components/controls/ConvertBtn.vue'
import ProgressOverlay from '@/components/controls/ProgressOverlay.vue'

const { isMobile } = useResponsive()
const store = useAudioStore()
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.wrapper {
  max-width: 960px;
  margin-inline: auto;
  padding-inline: $SPACING_MD;
}

.layout {
  display: flex;
  flex-direction: column;
  gap: $SPACING_LG;
  padding: $SPACING_XL;
  align-items: center;

  &.mobile {
    padding: $SPACING_MD;
  }
}

.import {
  width: 100%;
  border: 2px dashed $GROUP_HOVER;
  border-radius: $RADIUS_MD;
  padding: $SPACING_LG;
  text-align: center;
}

.file-msg {
  margin-top: $SPACING_SM;
  color: $TEXT_COLOR;
  font-size: 0.875rem;
}

.controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $SPACING_MD;
}

.format-row,
.action-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $SPACING_MD;
  flex-wrap: wrap;

  &.mobile {
    flex-direction: column;
  }
}
</style>
```
