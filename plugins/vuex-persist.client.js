import VuexPersistence from 'vuex-persist'

export default function ({ store }) {
  window.onNuxtReady(() => {
    // init vuex-persist only on settings
    new VuexPersistence({
      key: 'user-settings',
      storage: window.localStorage,
      modules: ['settings']
    }).plugin(store)
  })
}
