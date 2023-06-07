<script setup lang="ts">
interface ThemePreviewProps {
  theme: {
    work: number[]
    shortpause: number[]
    longpause: number[]
  }
}

const props = defineProps<ThemePreviewProps>()

const colorArrayToRgb = (color: number[]) => `rgb(${color.join(', ')})`
</script>

<template>
  <div class="flex flex-row gap-0 isolate">
    <div class="rounded-full w-8 h-8 z-20" :style="{ backgroundColor: colorArrayToRgb(props.theme.work) }" />
    <div class="rounded-full w-8 h-8 -ml-2 z-10" :style="{ backgroundColor: colorArrayToRgb(props.theme.shortpause) }" />
    <div class="rounded-full w-8 h-8 -ml-2" :style="{ backgroundColor: colorArrayToRgb(props.theme.longpause) }" />
  </div>
</template>
