export class LocaleManager {
    constructor(app, importLocaleCallback, defaultLocale = 'en') {
        this.app = app
        this.loadedLocales = [defaultLocale]
        this.importLocaleCallback = importLocaleCallback
    }

    set(locale) {
        return new Promise(resolve => {
            const i18n = this.app.$i18n

            if (i18n.locale === locale) {
                resolve(locale)
                return
            }

            const apply = () => {
                const {log, ui} = this.app.$utils

                log.send('changed from ' + i18n.locale + ' to ' + locale, 'locale')

                i18n.locale = locale
                ui.setLang(locale)
                return locale
            }

            if (this.loadedLocales.includes(locale)) {
                resolve(apply(locale))
                return
            }

            this.importLocaleCallback(locale).then(m => {
                i18n.setLocaleMessage(locale, m.default)
                this.loadedLocales.push(locale)
                resolve(apply(locale))
            })
        })
    }
}
