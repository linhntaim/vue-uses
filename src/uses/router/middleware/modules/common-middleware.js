import {Middleware} from '../middleware'

export class CommonMiddleware extends Middleware {
    constructor(beforeCallback = null, afterCallback = null) {
        super()

        this.beforeCallback = beforeCallback
        this.afterCallback = afterCallback
    }

    handle() {
        this.log('common', 'middleware')

        if (this.runBefore()) {
            this.beforeCallback && this.beforeCallback()
        } else if (this.runAfter()) {
            this.afterCallback && this.afterCallback()
        }

        this.next()
    }
}
