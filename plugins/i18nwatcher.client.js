export default function ({ store, app }) {
  if (app.i18n) {
    const appLang = store.state.settings.lang ? store.state.settings.lang : app.i18n.locale

    if (store.state.settings.lang) {
      // set nuxt-i18n language
      app.i18n.setLocale(appLang)
    } else {
      store.commit('settings/SET', { key: ['lang'], value: appLang })
    }

    // if settings.lang changes, update app locale
    store.watch(state => state.settings.lang, (newValue) => {
      if (newValue) {
        app.i18n.setLocale(newValue)
      }
    })
  }
}
