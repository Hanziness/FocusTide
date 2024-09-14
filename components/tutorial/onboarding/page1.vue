<script setup lang="ts">
import { IconClockPlay } from '@tabler/icons-vue'
import { useSettings } from '~~/stores/settings';

const settingsStore = useSettings()
</script>

<template>
  <div class="h-96 flex flex-col justify-start items-center gap-2">
    <div class="px-6 py-3 flex gap-2 text-lg flex-row justify-center items-center">
      <IconClockPlay :size="42" />
      Set your timer
    </div>
  </div>
</template>
