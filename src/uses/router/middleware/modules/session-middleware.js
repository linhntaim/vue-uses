import {Middleware} from '../middleware'

export class SessionMiddleware extends Middleware {
    handle() {
        this.log('session', 'middleware')

        this.session().start()
        this.next()
    }
}
