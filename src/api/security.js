import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefix || '/'

export const security = {
  demo: {
    add (opts) {
      // return doExec(`${apiPrefix}securityLog/selectList`, opts, null, 'get')
      return doExec(`${apiPrefix}securityLog/selectList`, opts)
    }
  }
}