import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefix || '/'

export const system = {
    demo: {
        add(opts) {
            // return doExec(`${apiPrefix}securityLog/selectList`, opts, null, 'get')
            return doExec(`${apiPrefix}securityLog/selectList`, opts)
        },
        uploadUrl(opts) {
            // return doExec(`${apiPrefix}securityLog/selectList`, opts, null, 'get')
            return doExec(`http://115.231.254.38:8100/api/safe/uploadFile`, opts)
        }
    }
}