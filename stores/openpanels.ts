import { defineStore } from 'pinia'

const useOpenPanels = defineStore('openpanels', {
  state: () => ({
    settings: false,
    todo: false
  })
})

export { useOpenPanels }
