<template>
  <Button default-style :importance="2" @click="openFileDialog">
    <input ref="fileinput" accept=".json" type="file" hidden @change="importFile">
    <span v-text="$t('settings.manage.buttons.load')" />
  </Button>
</template>

<script>
import Button from '@/components/base/button.vue'
import { useSettings } from '~~/stores/settings'
import { useTasklist } from '~~/stores/tasklist'

function filterImportedObject (store, objectToImport) {
  const storeKeys = Object.keys(store.$state)
  return Object
    .keys(objectToImport)
    .filter(key => storeKeys.includes(key))
    .reduce((prev, key) => Object.assign(prev, { [key]: objectToImport[key] }), {})
}

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
          const settingsStore = useSettings()
          const tasklistStore = useTasklist()
          settingsStore.$patch(filterImportedObject(settingsStore, importedValues.settings))
          tasklistStore.$patch(filterImportedObject(tasklistStore, importedValues.tasklist))
        } catch (err) {
          console.warn(err)
        }
      }
      reader.readAsText(file)
    }
  }
}
</script>
