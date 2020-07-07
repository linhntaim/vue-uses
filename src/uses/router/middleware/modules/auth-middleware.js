import Middleware from '../middleware'

export default class AuthMiddleware extends Middleware {
    constructor({app, log, passportCookieStore, APP_ROUTE}) {
        super({app, log})

        this.passportCookieStore = passportCookieStore
        this.APP_ROUTE = APP_ROUTE
    }

    handle($middlewareManager) {
        this.log.send('auth', 'middleware')

        this.handlePassport($middlewareManager)
    }

    handlePassport($middlewareManager) {
        const store = this.store()
        const storedPassport = this.passportCookieStore.retrieve()

        if (store.getters['account/isLoggedIn']) {
            if (!storedPassport.accessToken || !storedPassport.tokenType || !storedPassport.refreshToken || !storedPassport.tokenEndTime) {
                store.dispatch('account/storePassport')
            }

            this.handleAuth($middlewareManager)
            return
        }

        if (!storedPassport.accessToken || !storedPassport.tokenType || !storedPassport.refreshToken || !storedPassport.tokenEndTime) {
            this.handleNotAuth($middlewareManager)
            return
        }

        if ((new Date).getTime() <= storedPassport.tokenEndTime) {
            store.commit('account/setAuth', storedPassport)
            this.handleAuth($middlewareManager)
            return
        }

        store.dispatch('account/refreshToken', {
            refreshToken: storedPassport.refreshToken,
            doneCallback: () => {
                this.handleAuth($middlewareManager)
            },
            errorCallback: () => {
                this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.bad_request))
            },
        })
    }

    handleAuth($middlewareManager) {
        this.log.send('authenticated', 'auth')

        if (this.replaceRoutesIfNeeded($middlewareManager)) return

        if ($middlewareManager.to.matched.some(record => record.meta.requireNotAuth)) {
            this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.redirect_path_if_authenticated))
            return
        }

        this.store().dispatch('account/current', {
            doneCallback: () => {
                super.handle($middlewareManager)
            },
            errorCallback: err => {
                if ($middlewareManager.to.matched.some(record => record.meta.requireAuth)) {
                    this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.unauthenticated))
                    return
                }

                super.handle($middlewareManager)
            },
        })
    }

    handleNotAuth($middlewareManager) {
        this.log.send('unauthenticated', 'auth')

        if (this.replaceRoutesIfNeeded($middlewareManager, false)) return

        if ($middlewareManager.to.matched.some(record => record.meta.requireAuth)) {
            this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.redirect_path_if_unauthenticated))
            return
        }

        this.store().dispatch('account/anonymous', {
            callback: () => {
                super.handle($middlewareManager)
            },
        })
    }

    replaceRoutesIfNeeded($middlewareManager, auth = true) {
        const router = $middlewareManager.router
        if (auth ? router.switchToNotAuth() : router.switchToAuth()) {
            this.log.send('replaced', 'routes')

            this.redirect($middlewareManager, $middlewareManager.to.path, $middlewareManager.to.query, $middlewareManager.to.hash)
            return true
        }
        return false
    }
}
