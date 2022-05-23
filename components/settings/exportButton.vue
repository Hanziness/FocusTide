<template>
  <button class="px-4 py-3 transition border-2 border-red-400 rounded-full select-none dark:shadow-none hover:bg-red-400 active:bg-red-500 active:border-red-500 active:shadow-red-200 active:shadow-md" @click="downloadSettings" v-text="$i18n.t('settings.manage.buttons.save')" />
</template>

<script>
import { useSettings } from '@/stores/settings'
import { useTasklist } from '@/stores/tasklist'

export default {
  methods: {
    downloadSettings () {
      const settings = useSettings().$state
      const tasklist = useTasklist().$state

      const downloadObject = {
        settings,
        tasklist
      }

      const downloadElement = document.createElement('a')
      downloadElement.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(downloadObject))}`
      downloadElement.download = 'anotherpomodoro-settings.json'
      downloadElement.style.display = 'none'
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
    }
  }
}
</script>
