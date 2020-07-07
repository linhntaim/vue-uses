import Middleware from '../middleware'

export default class AppMiddleware extends Middleware {
    constructor({app, log}) {
        super({app, log})

        this.initializing = true
    }

    handle($middlewareManager) {
        this.log.send('app', 'middleware')

        if ($middlewareManager.before) {
            this.appReady(() => {
                this.log.send('created', 'app')

                if (this.initializing) {
                    this.initializing = false
                    document.getElementById('app-initializing').remove()
                }

                this.app().$bus.emit('page.loading')

                super.handle($middlewareManager)
            })
        } else if ($middlewareManager.after) {
            this.app().$bus.emit('page.loaded')

            super.handle($middlewareManager)
        }
    }
}
