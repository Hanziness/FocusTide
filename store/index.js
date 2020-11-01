export default {
  actions: {
    nuxtServerInit ({ dispatch }) {
      dispatch('events/initSchedule')
    }
  }
}
