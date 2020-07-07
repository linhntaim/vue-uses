import {log, serverClock} from '../../../utils'
import {APP_ROUTE} from '../../../config'
import Middleware from '../middleware'
import Vue from 'vue'

export default class ServerMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('server', 'middleware')

        const store = this.store()
        store.dispatch('prerequisite/require', {
            names: ['server'],
            doneCallback: () => {
                Vue.prototype.$server = store.getters['prerequisite/metadata'].server

                this.handleClock()

                super.handle($middlewareManager)
            },
            errorCallback: () => {
                this.redirect($middlewareManager, $middlewareManager.router.getPathByName(APP_ROUTE.connection_lost))
            },
        })
    }

    handleClock() {
        serverClock.setClock(this.app().$server.c)
    }
}
