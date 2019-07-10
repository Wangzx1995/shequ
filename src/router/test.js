
import Frame from '@/components/frame/Frame'
import Tmpl from '@/view/Tmpl'

import Test1 from '@/view/test1'
import Test2 from '@/view/test2'

export default [
  {
    path: '',
    //meta: {
    //  title: '首页'
    //},
    component: Frame,
    hiddenMenu: true,
    children: [
      {
        path: '/tmpl/',
        meta: {
          title: '示例页面'
        },
        component: Tmpl
      },
      {
        path: '/test1/',
        meta: {
          title: '示例页面1'
        },
        component: Test1
      },
      {
        path: '/test2/',
        meta: {
          title: '示例页面2'
        },
        component: Test2
      }
    ]
  }
]