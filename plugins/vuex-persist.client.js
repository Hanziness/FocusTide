import VuexPersistence from 'vuex-persistedstate'

export default function ({ store }) {
  // init vuex-persistedstate only on settings and tasks
  new VuexPersistence({
    key: 'user-settings',
    storage: window.localStorage,
    paths: ['settings', 'tasklist'],
    fetchBeforeUse: false,
    overwrite: false,
    setState (key, state, storage) {
      const finalSettings = {}
      finalSettings.tasklist = state.tasklist

      // if settings.reset is true-ish, do not save settings
      if (state.settings && !state.settings.reset) {
        finalSettings.settings = state.settings
      }

      storage.setItem(key, JSON.stringify(finalSettings))
    },
    rehydrated: (store) => {
      store.commit('loading/finished')
    }
  })(store)
}
