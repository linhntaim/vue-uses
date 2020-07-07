import VueI18n from 'vue-i18n'

export function use(localePath, defaultLocale = 'en') {
    return {
        plugin: VueI18n,
        promiseCallback: (resolve, reject, use) => {
            import(`${localePath}/${defaultLocale}`)
                .then(m => {
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