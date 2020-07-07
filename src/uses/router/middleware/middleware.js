import {session, Middleware as BaseMiddleware} from '@dsquare-gbu/vue-router'

export class Middleware extends BaseMiddleware {
    store() {
        return this.app().$store
    }

    utils() {
        return this.app().$utils
    }

    bus() {
        return this.app().$bus
    }

    log(message, namespace) {
        this.utils().log.send(message, namespace)
    }

    runBefore() {
        return this.middlewareManager.before
    }

    runAfter() {
        return this.middlewareManager.after
    }

    session() {
        return session
    }
}
