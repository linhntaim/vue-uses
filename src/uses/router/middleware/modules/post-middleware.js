import {facebookSdk, googleApi, log} from '../../../utils'
import {serviceFactory} from '../../../services/service_factory'
import {PromiseManager} from '../../../../plugins/utils'
import {UserAgentApplication} from 'msal'
import {MICROSOFT_SERVICE} from '../../../config'
import Middleware from '../middleware'

export default class PostMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('post', 'middleware')

        this.promiseManager = new PromiseManager()

        this.server = this.app().$server

        this.handlePromising()

        this.promiseManager.ready().then(() => {
            this.handlePromised()

            super.handle($middlewareManager)
        })
    }

    handlePromising() {
        if (this.server.facebook_enabled) {
            this.promiseManager.add('facebook_sdk', facebookSdk.set({
                localeCode: 'en',
                countryCode: 'US',
            }).safeLoad())
        }

        if (this.server.google_enabled) {
            this.promiseManager.add('facebook_sdk', googleApi.safeLoad())
        }

        if (this.server.microsoft_enabled) {
            serviceFactory.factory('msal', new UserAgentApplication({
                auth: {
                    clientId: MICROSOFT_SERVICE.client_id,
                },
            }))
        }
    }

    handlePromised() {
        if (this.server.facebook_enabled) {
            log.send('loaded', 'facebook')
            serviceFactory.factory('facebook', window.FB)
        }
        if (this.server.google_enabled) {
            log.send('loaded', 'google')
            serviceFactory.factory('google', window.gapi)
        }
    }
}
