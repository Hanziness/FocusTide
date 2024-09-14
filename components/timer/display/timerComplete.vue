<script setup lang="ts">
import { IconCheck as CompleteIcon } from '@tabler/icons-vue'
</script>

<template>
  <div class="timer-complete-icon">
    <CompleteIcon />
  </div>
</template>

<style lang="scss" scoped>
.timer-complete-icon svg {
  width: calc(max(20vw, 20vh)) !important;
  height: calc(max(20vw, 20vh)) !important;
}
</style>
