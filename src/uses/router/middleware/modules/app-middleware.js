import {Middleware} from '../middleware'

export class AppMiddleware extends Middleware {
    constructor(htmlInitializingClass = 'app-initializing') {
        super()

        this.initializing = true
        this.htmlInitializingClass = htmlInitializingClass
    }

    handle($middlewareManager) {
        this.log('app', 'middleware')

        if (this.runBefore()) {
            if (this.initializing) {
                this.initializing = false
                document.getElementById(this.htmlInitializingClass).remove()
            }

            this.bus().emit('page.loading')
        } else if (this.runAfter()) {
            this.bus().emit('page.loaded')
        }

        this.next()
    }
}
