<template>
  <Button default-style :importance="2" @click="downloadSettings" v-text="$t('settings.manage.buttons.save')" />
</template>

<script>
import Button from '@/components/base/button.vue'
import { useSettings } from '@/stores/settings'
import { useTasklist } from '@/stores/tasklist'

export default {
  components: {
    Button
  },
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
