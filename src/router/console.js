// 指挥调度中心

import Frame from '@/components/frame/Frame'

export default [
  {
    path: '/console/index',
    meta: {
        title: '指挥调度中心'
    },
    iconClz: 'icon-x-order',
    component: () => import("@/view/console/ConsoleIndex")
  },
]