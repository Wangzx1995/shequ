
import Login from '@/view/Login'
import Index from '@/view/Index'

export default [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    hiddenMenu: true,
    component: Index
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