import Cookies from 'js-cookie'

// 管理员信息
const USER_INFO = 'user_info'

// 获取基本信息
function getUserInfo() {
  return Cookies.getJSON(USER_INFO) || {}
}
// 存储基本信息
function setUserInfo(info) {
  Cookies.set('token', info.token)
  return Cookies.set(USER_INFO, info)
}
// 退出登录，清除所有登录信息
function logout() {
  Cookies.remove('token')
  return Cookies.remove(USER_INFO)
}

export {
  getUserInfo,
  setUserInfo,
  logout
}
