import {Middleware} from '../middleware'

export class AppMiddleware extends Middleware {
    constructor(htmlInitializingId = 'app-initializing') {
        super()

        this.initializing = true
        this.htmlInitializingCId = htmlInitializingId
    }

    handle() {
        this.log('app', 'middleware')

        if (this.runBefore()) {
            this.removeInitializing()

            this.bus().emit('page.loading')
        } else if (this.runAfter()) {
            this.bus().emit('page.loaded')
        }

        this.next()
    }

    removeInitializing() {
        if (this.initializing) {
            this.initializing = false

            const e = document.getElementById(this.htmlInitializingCId)
            if (e) typeof e.remove === 'function' ? e.remove() : e.parentNode.removeChild(e)
        }
    }
}
