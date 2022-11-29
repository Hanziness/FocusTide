<script setup lang="ts">
import ButtonControl from '@/components/base/button.vue'
import { useSettings } from '~~/stores/settings'
import { useTasklist } from '~~/stores/tasklist'

const downloadSettings = () => {
  const settings = useSettings().$state
  const tasklist = useTasklist().$state

  const downloadObject = {
    settings,
    tasklist
  }

  const downloadElement = document.createElement('a')
  downloadElement.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(downloadObject))}`
  downloadElement.download = 'focustide-settings.json'
  downloadElement.style.display = 'none'
  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
}
</script>

<template>
  <ButtonControl default-style :importance="2" @click="downloadSettings">
    <span v-text="$t('settings.manage.buttons.save')" />
  </ButtonControl>
</template>
