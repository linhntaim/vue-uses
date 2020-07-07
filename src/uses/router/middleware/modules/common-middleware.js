import {intervalCaller, log, timeoutCaller, ui} from '../../../utils'
import Middleware from '../middleware'

export default class CommonMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('common', 'middleware')

        if ($middlewareManager.before) {
            timeoutCaller.clear()
            intervalCaller.clear()
            super.handle($middlewareManager)
        } else if ($middlewareManager.after) {
            ui.scrollToTop()
            super.handle($middlewareManager)
        }
    }
}
