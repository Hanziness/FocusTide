import { defineNuxtPlugin } from '#app'

/// Inject available language from `$i18n` as $languages
export default defineNuxtPlugin((nuxtApp) => {
  const availableLocales = {}

  if (nuxtApp.vueApp.i18n) {
    for (const lang of nuxtApp.vueApp.i18n.locales.value) {
      availableLocales[lang.code] = lang.name
    }
  }

  nuxtApp.provide('languages', availableLocales)
})
