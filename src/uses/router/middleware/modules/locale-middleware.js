import {log} from '../../../utils'
import Middleware from '../middleware'

export default class LocaleMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('locale', 'middleware')

        const query = $middlewareManager.to.query
        const locale = query.locale ? query.locale : (query.lang ? query.lang : null)
        if (locale) {
            this.store().dispatch('account/updateLocale', {
                locale: locale,
                doneCallback: () => super.handle($middlewareManager),
            })
        } else {
            super.handle($middlewareManager)
        }
    }
}
