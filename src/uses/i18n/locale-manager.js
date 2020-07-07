export class LocaleManager {
    constructor(app, localePath, defaultLocale = 'en') {
        this.app = app
        this.loadedLocales = [defaultLocale]
        this.localePath = localePath
    }

    set(locale) {
        return new Promise(resolve => {
            const i18n = this.app.$i18n
            const {log, ui} = this.app.$utils

            if (i18n.locale === locale) {
                resolve(locale)
                return
            }

            const apply = () => {
                log.send('changed from ' + i18n.locale + ' to ' + locale, 'locale')

                i18n.locale = locale
                ui.setLang(locale)
                return locale
            }

            if (this.loadedLocales.includes(locale)) {
                resolve(apply(locale))
                return
            }

            import(`${this.localePath}/${locale}`).then(m => {
                i18n.setLocaleMessage(locale, m.default)
                this.loadedLocales.push(locale)
                resolve(apply(locale))
            })
        })
    }
}
