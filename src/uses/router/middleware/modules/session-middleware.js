import Middleware from '../middleware'

export default class SessionMiddleware extends Middleware {
    handle($middlewareManager) {
        this.log.send('session', 'middleware')

        this.session().start()
        super.handle($middlewareManager)
    }
}
