"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.use=use;var _vueRouter=_interopRequireDefault(require("@linhntaim/vue-router"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function use(routes){var beforeMiddleware=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var afterMiddleware=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];return{plugin:_vueRouter["default"],attached:new _vueRouter["default"]({mode:"history",base:process.env.BASE_URL,routes:routes,beforeDefault:beforeMiddleware,afterDefault:afterMiddleware})}}
//# sourceMappingURL=use.js.map