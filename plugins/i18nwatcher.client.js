export default function ({ store, app }) {
  if (app.i18n) {
    const storeLang = store.state.settings.lang

    if (storeLang) {
      // set nuxt-i18n language
      app.i18n.setLocale(storeLang)
      if (app.$dayjs) {
        // also set dayJS locale
        app.$dayjs.dayjs.locale(storeLang)

        // and automatically change it when the nuxt-i18n locale changes
        app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
          app.$dayjs.dayjs.locale(newLocale)
        }
      }
    }

    // if settings.lang changes, update app locale
    store.watch(state => state.settings.lang, (newValue) => {
      if (newValue) {
        app.i18n.setLocale(newValue)
      }
    })
  }
}
