<template>
  <Button @click="openFileDialog">
    <input ref="fileinput" accept=".json" type="file" hidden @change="importFile">
    Import
  </Button>
</template>

<script>
import Button from '@/components/base/button.vue'
import { useSettings } from '~/stores/settings'
import { useTasklist } from '~/stores/tasklist'

export default {
  components: { Button },

  methods: {
    openFileDialog () {
      this.$refs.fileinput.click()
    },

    importFile () {
      // try to get file from the input field
      const file = this.$refs.fileinput.files[0]
      if (!file) {
        return
      }

      // read file
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContents = e.target.result

        // try to patch settings and task list with the imported values
        try {
          const importedValues = JSON.parse(fileContents)
          useSettings().$patch(importedValues.settings)
          useTasklist().$patch(importedValues.tasklist)
        } catch (err) {
          console.warn(err)
        }
      }
      reader.readAsText(file)
    }
  }
}
</script>
