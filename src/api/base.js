import { doExec } from '@/api/request'

const apiPrefix = window.apiPreBase || '/'

export const base = {
    // 文件上传
    upload (opts) {
        return doExec(`${window.apiPrefixSystem || '/'}base/upload`, opts)
    },
    //登陆
    loginIn(opts) {
        return doExec(`${apiPrefix}user/loginIn`, opts)
    },
    //登出
    loginOut(opts) {
        return doExec(`${apiPrefix}user/loginOut`, opts, null, 'get')
    },

}