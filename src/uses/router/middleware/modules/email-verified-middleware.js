import {log} from '../../../utils'
import {APP_ROUTE} from '../../../config'
import Middleware from '../middleware'

export default class EmailVerifiedMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('email verified', 'middleware')

        const store = this.store()
        if (store.getters['account/isLoggedIn']) {
            const user = store.getters['account/user']

            if (user.email && user.email.verified
                && $middlewareManager.to.matched.some(record => record.name === APP_ROUTE.verify_email)) {
                this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.redirect_path_if_authenticated))
                return
            }

            if ($middlewareManager.to.matched.some(record => record.meta.requireEmailVerified)
                && user.email && !user.email.verified
                && !$middlewareManager.to.matched.some(record => record.name === APP_ROUTE.verify_email)) {
                this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.verify_email))
                return
            }
        }

        super.handle($middlewareManager)
    }
}
