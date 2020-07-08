import {Middleware} from '../middleware'

export class AppMiddleware extends Middleware {
    constructor(htmlInitializingClass = 'app-initializing') {
        super()

        this.initializing = true
        this.htmlInitializingClass = htmlInitializingClass
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

            const e = document.getElementById(this.htmlInitializingClass)
            if (e) e.remove()
        }
    }
}
