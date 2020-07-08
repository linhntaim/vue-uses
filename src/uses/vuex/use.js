import Vuex from 'vuex'

export function use(modules) {
    return {
        plugin: Vuex,
        attached: () => new Vuex.Store({
            modules: modules,
        }),
    }
}