import axios from 'axios'
import qs from 'qs'
import ServerMixin from '@/mixin/ServerMixin'
import { getUserInfo } from '@/utils/auth'

export const doExec = (url, params, contentType, methods) => {
    let pstr = qs.stringify(params, {
        arrayFormat: 'brackets'
    })
    contentType = (contentType || 'json').toUpperCase()
    methods = (methods || 'POST').toUpperCase()

    const pstrMethods = ['GET', 'DELETE']

    return axios({
        url: pstrMethods.indexOf(methods) === -1 ? url : `${url}?${pstr}`,
        params: null,
        data: contentType === 'JSON' ? params : qs.stringify(params),
        method: methods,
        headers: {
            token: getUserInfo().token
        },
    }).then((res) => {
        if (res.data.code == 4000) {
            ServerMixin.Event.$emit('login', res.data.data)
            return {}
        } else {
            return res.data
        }
    })
}
