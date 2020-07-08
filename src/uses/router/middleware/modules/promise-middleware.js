import {Middleware} from '../middleware'
import {PromiseManager} from '@dsquare-gbu/vue-utils'

export class PromiseMiddleware extends Middleware {
    constructor(promisingCallback, promisedCallback) {
        super()

        this.promiseManager = new PromiseManager()
        this.promisingCallback = promisingCallback
        this.promisedCallback = promisedCallback
    }

    handle() {
        this.log('promise', 'middleware')

        this.promisingCallback(this)
        this.promiseManager.ready().then(() => {
            this.promisedCallback(this)
            this.next()
        })
    }
}
