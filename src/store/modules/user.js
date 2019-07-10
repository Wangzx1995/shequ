import {
  setUserInfo,
  getUserInfo,
  logout
} from '@/utils/auth'

import {
  api
} from '@/api/'
const user = {
  state: {
    account: null,
    role: null
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.account = account
    }
  },
  actions: {
    // 登录
    login({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        commit('SET_ACCOUNT', 123)
        setUserInfo({
          account: params.account,
          token: 123
        })
        resolve({
          account: params.account,
          token: 123
        })
        /*api.manager.login(params).then((res) => {
          if (res.code == 1000) {
            const { data } = res
            commit('SET_ACCOUNT', data)
            setUserInfo({
              userName: params.username,
              token: data
            })
            resolve({
              userName: params.username,
              token: data
            })
          } else {
            reject(res.message)
          }
        })*/
      })
    },
    // 退出登录
    logout({
      commit
    }, params) {
      commit('SET_ACCOUNT', null)
      logout()
      window.location.href = `/#/login?redirectUrl=${encodeURIComponent(location.href)}`
    },
    // 刷新vuex
    setUserInfo({
      commit
    }) {
      var userInfo = getUserInfo()

      commit('SET_ACCOUNT', userInfo)
    }
  }
}

export default user
