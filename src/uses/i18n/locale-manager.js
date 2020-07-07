export default class LocaleManager {
    constructor(localePath, {app, log, ui}) {
        this.app = app
        this.log = log
        this.ui = ui
        this.loadedLocales = []
        this.localePath = localePath
    }

    localize(settings) {
        return this.set(settings.locale)
    }

    loaded(locale) {
        if (!this.loadedLocales.includes(locale)) {
            this.loadedLocales.push(locale)
        }
        return this
    }

    set(locale) {
        return new Promise(resolve => {
            const i18n = this.app.instance.$i18n

            if (i18n.locale === locale) {
                resolve(locale)
                return
            }

            const apply = () => {
                this.log.send('changed from ' + i18n.locale + ' to ' + locale, 'locale')

                i18n.locale = locale
                this.ui.setLang(locale)
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
