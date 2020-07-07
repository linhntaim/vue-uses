import {log, permissionChecker} from '../../../utils'
import {APP_ROUTE} from '../../../config'
import routePermissions from '../../route-permissions'
import Middleware from '../middleware'

export default class PermissionMiddleware extends Middleware {
    handle($middlewareManager) {
        log.send('permission', 'middleware')

        const accountPermissions = this.store().getters['account/permissions']
        for (let i = 0, loop = $middlewareManager.to.matched.length; i < loop; ++i) {
            const route = $middlewareManager.to.matched[i]
            if ('name' in route && route.name in routePermissions) {
                if (!permissionChecker.checkAtLeast(routePermissions[route.name], accountPermissions)) {
                    this.redirect($middlewareManager, APP_ROUTE.unauthorized)
                    return
                }
            }
        }

        super.handle($middlewareManager)
    }
}
