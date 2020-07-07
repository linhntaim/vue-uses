import {session, Middleware as BaseMiddleware} from '@dsquare-gbu/vue-router'

export default class Middleware extends BaseMiddleware {
    constructor({app, log}) {
        super()

        this.application = app
        this.log = log
    }

    app() {
        return this.application.instance
    }

    appReady(callback) {
        return this.application.get().then(callback)
    }

    store() {
        return this.app().$store
    }

    session() {
        return session
    }
}
