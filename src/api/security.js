import {
    doExec
} from '@/api/request'

const apiPrefix = window.apiPrefixSecurity || '/'

export const security = {
    event: {
        list (opts) {
            // return doExec(`${apiPrefix}securityLog/selectList`, opts, null, 'get')
            return doExec(`${apiPrefix}secInc/eventSel`, opts)
        }
    }
}