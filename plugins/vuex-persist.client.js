import VuexPersistence from 'vuex-persistedstate'

export default function ({ store }) {
  // init vuex-persistedstate only on settings and tasks
  new VuexPersistence({
    key: 'user-settings',
    storage: window.localStorage,
    paths: ['settings', 'tasklist'],
    rehydrated: (store) => {
      store.commit('loading/finished')
    }
  })(store)
}
