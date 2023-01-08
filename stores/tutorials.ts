import { defineStore } from 'pinia'

export const useTutorials = defineStore('tutorials', {
  state: () => ({
    openTutorials: [] as string[]
  }),

  getters: {
    isTutorialOpen: (state) => {
      return (tutorialId: string) => state.openTutorials.indexOf(tutorialId) === 0
    },

    currentTutorial: state => state.openTutorials[0] ?? null
  },

  actions: {
    openTutorial (tutorialId: string) {
      if (!this.openTutorials.includes(tutorialId)) {
        this.openTutorials.push(tutorialId)
      }
    },

    closeTutorial (tutorialId: string) {
      const tutorialIndex = this.openTutorials.indexOf(tutorialId)
      if (tutorialIndex >= 0) {
        this.openTutorials.splice(tutorialIndex, 1)
      }
    }
  }
})
