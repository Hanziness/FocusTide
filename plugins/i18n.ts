import { createI18n } from 'vue-i18n'
import type { PiniaPluginContext } from 'pinia'

import messages from '@intlify/unplugin-vue-i18n/messages'
import { useSettings } from '~~/stores/settings'

interface Language {
  /// The name of the language written in that language (eg. "magyar" for Hungarian)
  name: string,
  /// The ISO code of the language (e.g. "hu-HU" for Hungarian)
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
  },
  zh: {
    name: '简体中文',
    iso: 'zh-CN'
  }
}

const getClientLocale = () : string | undefined => {
  if (typeof navigator === 'undefined') {
    console.log('No navigator, defaulting to English')
    return undefined
  }

  const navigatorLocale = navigator.language

  // match ISO first
  const matchingIsoCodes = Object.keys(languages).filter(key => languages[key].iso.toLowerCase() === navigatorLocale.toLowerCase())

  if (matchingIsoCodes.length > 0) {
    console.log(`Found matching locale: ${matchingIsoCodes[0]}`)
    return matchingIsoCodes[0]
  }

  // then match on language keys
  const looselyMatchingLanguages = Object.keys(languages).filter(key => navigatorLocale.toLowerCase().startsWith(key))
  if (looselyMatchingLanguages.length > 0) {
    console.log(`Found loosely matching locale: ${looselyMatchingLanguages[0]}`)
    return looselyMatchingLanguages[0]
  }

  // default to English
  return 'en'
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

  onNuxtReady(() => {
    if (!import.meta.server) {
      const settingsStore = useSettings()
      if (settingsStore.lang === undefined) {
        settingsStore.lang = getClientLocale()
      }
    }
  })

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
