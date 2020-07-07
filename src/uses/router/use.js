import Router from '@dsquare-gbu/vue-router'

export function use(routes, beforeMiddleware = [], afterMiddleware = []) {
    return {
        plugin: Router,
        attached: new Router({
            mode: 'history',
            base: process.env.BASE_URL,
            routes: routes,
            beforeDefault: beforeMiddleware,
            afterDefault: afterMiddleware,
        }),
    }
}