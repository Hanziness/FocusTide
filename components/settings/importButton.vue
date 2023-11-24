<script setup lang="ts">
import { type Ref } from 'vue'
import { type Store } from 'pinia'
import { ButtonImportance } from '../base/types/button'
import Button from '~~/components/base/uiButton.vue'
import { useSettings } from '~~/stores/settings'
import { useTasklist } from '~~/stores/tasklist'

const fileinput: Ref<HTMLInputElement | null> = ref(null)

function filterImportedObject (store: Store, objectToImport: Record<string, unknown>) {
  const storeKeys = Object.keys(store.$state)
  return Object
    .keys(objectToImport)
    .filter(key => storeKeys.includes(key))
    .reduce((prev, key) => Object.assign(prev, { [key]: objectToImport[key] }), {})
}

const openFileDialog = () => {
  fileinput.value?.click()
}

const importFile = () => {
  // try to get file from the input field
  const file = (fileinput.value as HTMLInputElement).files?.item(0)
  if (!file) {
    return
  }

  // read file
  const reader = new FileReader()
  reader.onload = (e) => {
    if (!e.target) { return }
    const fileContents = e.target.result

    if (!fileContents) { return }

    // try to patch settings and task list with the imported values
    try {
      const importedValues = JSON.parse(fileContents as string)
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
</script>

<template>
  <Button default-style :importance="ButtonImportance.Filled" @click="openFileDialog">
    <input ref="fileinput" accept=".json" type="file" hidden @change="importFile">
    <span v-text="$t('settings.manage.buttons.load')" />
  </Button>
</template>
