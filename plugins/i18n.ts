import { createI18n } from 'vue-i18n'
import { PiniaPluginContext } from 'pinia'

import messages from '@intlify/unplugin-vue-i18n/messages'

interface Language {
  name: string,
  iso: string
}

declare type LanguageStore = Record<string, Language>;

/**
 * The languages known by the application.
 * A key of this object refers to the translation file `i18n/<key>.json`.
 * Each language object contains the readable name of the
 * language (written in that language) (`name`) and its ISO code (`iso`).
 */
export const languages : LanguageStore = {
  en: {
    name: 'English',
    iso: 'en-US'
  },
  fr: {
    name: 'Français',
    iso: 'fr-FR'
  },
  hr: {
    name: 'Hrvatski',
    iso: 'hr-HR'
  },
  hu: {
    name: 'Magyar',
    iso: 'hu-HU'
  },
  es: {
    name: 'Español',
    iso: 'es-ES'
  },
  pt: {
    name: 'Português (Brasil)',
    iso: 'pt-BR'
  }
}

export default defineNuxtPlugin(({ vueApp, $pinia }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages
  })

  const changeLocaleDynamic = async (newLocale: string) => {
    if (Object.keys(languages).includes(newLocale)) {
      // Load locale dynamically if it has not been loaded yet
      if (!i18n.global.availableLocales.includes(newLocale)) {
        const newLocaleMessages = await import(`@/i18n/${newLocale}.json`)

        i18n.global.setLocaleMessage(newLocale, newLocaleMessages.default)
      }

      // Update app locale
      i18n.global.locale.value = newLocale
    }
  }

  vueApp.use(i18n)

  // Register store lang change watcher
  const installPiniaI18nPlugin = () => {
    const router = useRouter()
    const PiniaI18nPlugin = ({ store }: PiniaPluginContext) => {
      // if settings.lang changes, update app locale
      if (store.$id === 'settings') {
        if (!store.$state.lang && i18n.global.locale) {
          store.$state.lang = i18n.global.locale.value
        }

        const changeSubscription = () => {
          store.$subscribe(() => {
            if (store.$state.lang) {
              changeLocaleDynamic(store.$state.lang)
            }
          })
        }

        changeSubscription()
        router.afterEach(changeSubscription)
      }
    }
    $pinia.use(PiniaI18nPlugin)
  }

  installPiniaI18nPlugin()

  return {
    provide: {
      setLocale: changeLocaleDynamic,
      languages: (Object.keys(languages) as Array<keyof typeof languages>).reduce((prev, lang) => {
        prev[lang] = languages[lang].name
        return prev
      }, {} as Record<keyof typeof languages, string>)
    }
  }
})
