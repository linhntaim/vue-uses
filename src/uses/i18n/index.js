import VueI18n from 'vue-i18n'

export default function (localeManager, localePath, defaultLocale = 'en') {
    return {
        plugin: VueI18n,
        promiseCallback: (resolve, reject, use) => {
            import(`${localePath}/${defaultLocale}`)
                .then(m => {
                    localeManager.loaded(defaultLocale)

                    use.hasAttached = true
                    use.attached = new VueI18n({
                        locale: defaultLocale,
                        fallbackLocale: defaultLocale,
                        silentFallbackWarn: true,
                        messages: (() => {
                            const messages = {}
                            messages[defaultLocale] = m.default
                            return messages
                        })(),
                    })

                    resolve()
                })
                .catch(e => reject(e))
        },
    }
}
