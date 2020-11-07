export default {
  actions: {
    nuxtServerInit ({ commit }) {
      // initialize with 10 entries, no need for phantom entries then
      commit('schedule/initSchedule', 10)
    }
  }
}
