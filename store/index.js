export default {
  state () {
    return {
      version: process.env.PACKAGE_VERSION
    }
  },
  actions: {
    nuxtServerInit ({ commit, isDev }) {
      // initialize with 10 entries, no need for phantom entries then
      commit('schedule/initSchedule', 10)

      // remove debug items from settings in production
      if (!isDev) {
        commit('settings/removeDebugItems')
      }
    }
  }
}
