import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(({ vueApp, $pinia }) => {
  if (vueApp.i18n) {
    const router = useRouter()
    const PiniaI18nPlugin = ({ store }) => {
      // if settings.lang changes, update app locale
      if (store.$id === 'settings') {
        if (!store.$state.lang && vueApp.i18n.locale) {
          store.$state.lang = vueApp.i18n.locale
        }

        const changeSubscription = () => {
          store.$subscribe(() => {
            if (store.$state.lang) {
              vueApp.i18n.setLocale(store.$state.lang)
            }
          })
        }

        changeSubscription()
        router.afterEach(changeSubscription)
      }
    }

    $pinia.use(PiniaI18nPlugin)
  }
})
