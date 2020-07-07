import {deviceCookieStore, log} from '../../../utils'
import {APP_ROUTE} from '../../../config'
import Middleware from '../middleware'

export default class DeviceMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('device', 'middleware')

        const badRequestPath = $middlewareManager.router.getPathByName(APP_ROUTE.bad_request)
        const store = this.store()

        if (store.getters['device/failed'] && $middlewareManager.to.path === badRequestPath) {
            super.handle($middlewareManager)
            return
        }

        const session = this.session()
        const storedDevice = deviceCookieStore.retrieve()

        if (session.isNotFresh() && store.getters['device/existed']) {
            if (!storedDevice.provider || !storedDevice.secret) {
                store.dispatch('device/device')
            }
            super.handle($middlewareManager)
            return
        }

        if (session.isFresh() || !storedDevice.provider || !storedDevice.secret) {
            store.dispatch('device/current', {
                device: storedDevice,
                isLoggedIn: store.getters['account/isLoggedIn'],
                doneCallback: () => {
                    super.handle($middlewareManager)
                },
                errorCallback: () => {
                    store.dispatch('device/fails')
                    super.redirect($middlewareManager, badRequestPath)
                },
            })
            return
        }

        super.handle($middlewareManager)
    }
}
