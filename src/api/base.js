import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefix || '/'

export const base = {
    upload: {
        upload(opts) {
            return doExec(`${apiPrefix}base/upload`, opts)
        },
    }

}