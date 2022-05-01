const NuxtI18nWatcherPlugin = ({ app, $pinia }) => {
  if (app.i18n) {
    const PiniaI18nPlugin = ({ store }) => {
      // if settings.lang changes, update app locale
      if (store.$id === 'settings') {
        if (!store.$state.lang && app.i18n.locale) {
          store.$state.lang = app.i18n.locale
        }

        const changeSubscription = () => {
          store.$subscribe(() => {
            if (store.$state.lang) {
              app.i18n.setLocale(store.$state.lang)
            }
          })
        }

        changeSubscription()
        app.router.afterEach(changeSubscription)
      }
    }

    $pinia.use(PiniaI18nPlugin)
  }
}

export default NuxtI18nWatcherPlugin
