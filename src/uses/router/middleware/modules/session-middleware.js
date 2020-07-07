import {Middleware} from '../middleware'

export class SessionMiddleware extends Middleware {
    handle($middlewareManager) {
        this.log('session', 'middleware')

        this.session().start()
        this.next()
    }
}
