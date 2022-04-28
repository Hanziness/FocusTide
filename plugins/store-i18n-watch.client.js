const NuxtI18nWatcherPlugin = ({ app, $pinia }) => {
  if (app.i18n) {
    $pinia.use(({ store }) => {
      // if settings.lang changes, update app locale
      if (store.$id === 'settings') {
        if (!store.$state.lang && app.i18n.locale) {
          store.$state.lang = app.i18n.locale
        }

        store.$subscribe(() => {
          if (store.$state.lang) {
            app.i18n.setLocale(store.$state.lang)
          }
        })
      }
    })
  }
}

export default NuxtI18nWatcherPlugin
