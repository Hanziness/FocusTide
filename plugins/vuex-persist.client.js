import VuexPersistence from 'vuex-persistedstate'

export default function ({ store }) {
  // init vuex-persistedstate only on settings
  new VuexPersistence({
    key: 'user-settings',
    storage: window.localStorage,
    paths: ['settings']
  })(store)
}
