import {Router} from '@linhntaim/vue-router'

export function use(routes, beforeMiddleware = [], afterMiddleware = []) {
    return {
        plugin: Router,
        attached: new Router({
            mode: 'history',
            base: process.env.VUE_APP_BASE_ROUTER_URL ? process.env.VUE_APP_BASE_ROUTER_URL : process.env.BASE_URL,
            routes: routes,
            beforeDefault: beforeMiddleware,
            afterDefault: afterMiddleware,
        }),
    }
}