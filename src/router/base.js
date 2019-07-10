
import Login from '@/view/Login'

export default [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    hiddenMenu: true,
    redirect: '/system/community-info'
  },
  {
    path: '/login/',
    meta: {
      title: '登录'
    },
    hiddenMenu: true,
    component: Login
  }
]