import axios from 'axios'
import qs from 'qs'
import ServerMixin from '@/mixin/ServerMixin'
import { getUserInfo } from '@/utils/auth'

export const doExec = (url, params, contentType, methods) => {
  let pstr = qs.stringify(params, {
    arrayFormat: 'brackets'
  })
  contentType = contentType || 'json'
  return axios({
    url: (methods && methods.toUpperCase()) !== 'GET' ? url : `${url}?${pstr}`,
    params: null,
    data: (contentType && contentType.toUpperCase()) === 'JSON' ? params : qs.stringify(params),
    method: methods || 'POST',
    headers: {
      token: getUserInfo().token
    }
  }).then((res) => {
    if (res.data.code == 4000) {
      ServerMixin.Event.$emit('login', res.data.data)
      return {}
    } else {
      return res.data
    }
  })
}
