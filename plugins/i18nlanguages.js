/// Inject available language from `$i18n` as $languages
export default function ({ app }, inject) {
  const availableLocales = {}

  if (app.i18n) {
    for (const lang of app.i18n.locales) {
      availableLocales[lang.code] = lang.name
    }
  }

  inject('languages', availableLocales)
}
