import AuthMiddleware from './modules/auth-middleware'
import CommonMiddleware from './modules/common-middleware'
import DeviceMiddleware from './modules/device-middleware'
import LocaleMiddleware from './modules/locale-middleware'
import EmailVerifiedMiddleware from './modules/email-verified-middleware'
import PermissionMiddleware from './modules/permission-middleware'
import PostMiddleware from './modules/post-middleware'
import ServerMiddleware from './modules/server-middleware'

const authMiddleware = new AuthMiddleware()
const commonMiddleware = new CommonMiddleware()
const deviceMiddleware = new DeviceMiddleware()
const emailVerifiedMiddleware = new EmailVerifiedMiddleware()
const localeMiddleware = new LocaleMiddleware()
const permissionMiddleware = new PermissionMiddleware()
const postMiddleware = new PostMiddleware()
const serverMiddleware = new ServerMiddleware()

export const all = {
    before: [
        serverMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
        deviceMiddleware,
        emailVerifiedMiddleware,
        permissionMiddleware,
        postMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}

export const error = {
    before: [
        serverMiddleware,
        commonMiddleware,
        authMiddleware,
        localeMiddleware,
        postMiddleware,
    ],
    after: [
        commonMiddleware,
    ],
}
