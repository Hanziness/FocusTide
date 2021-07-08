export default {
  state () {
    return {
      persist_finished: false
    }
  },

  mutations: {
    finished (state) {
      state.persist_finished = true
    }
  }
}
