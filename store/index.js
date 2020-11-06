export default {
  actions: {
    nuxtServerInit ({ state, commit }) {
      commit('schedule/initSchedule', state.settings.schedule.numScheduleEntries)
    }
  }
}
