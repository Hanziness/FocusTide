import { defineStore } from 'pinia'

export const useTutorials = defineStore('tutorials', {
  state: () => ({
    openTutorials: []
  }),

  getters: {
    isTutorialOpen: (state) => {
      return tutorialId => state.openTutorials.indexOf(tutorialId) === 0
    },

    currentTutorial: state => state.openTutorials[0] ?? null
  },

  actions: {
    openTutorial (tutorialId) {
      if (!this.openTutorials.includes(tutorialId)) {
        this.openTutorials.push(tutorialId)
      }
    },

    closeTutorial (tutorialId) {
      const tutorialIndex = this.openTutorials.indexOf(tutorialId)
      if (tutorialIndex >= 0) {
        this.openTutorials.splice(tutorialIndex, 1)
      }
    }
  }
})
