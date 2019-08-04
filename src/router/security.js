// 智慧安防管理

import Frame from '@/components/frame/security/Frame'

export default [
    {
        path: '/security/',
        component: Frame,
        children: [
            {
                path: 'index',
                meta: {
                    title: '工作台'
                },
                component: () => import("@/view/security/SecurityIndex")
            },
        ]
    },
    {
        path: '/security/',
        component: Frame,
        children: [
            {
                path: 'video-index',
                meta: {
                    title: '视频监控'
                },
                component: () => import("@/view/security/video/VideoIndex")
            },
        ]
    },
    {
        path: '/security/',
        meta: {
            title: '通行记录'
        },
        component: Frame,
        children: [
            {
                path: 'car-record',
                meta: {
                    title: '车辆通行记录'
                },
                component: () => import("@/view/security/record/CarRecord")
            },
            {
                path: 'human-record',
                meta: {
                    title: '人员通行记录'
                },
                component: () => import("@/view/security/record/HumanRecord")
            },
            {
                path: 'electric-bike-record',
                meta: {
                    title: '电动车通行记录'
                },
                component: () => import("@/view/security/record/ElectricBikeRecord")
            },
        ]
    },
    {
        path: '/security/',
        component: Frame,
        children: [
            {
                path: 'battery-charging-index',
                meta: {
                    title: '智能充电桩'
                },
                component: () => import("@/view/security/battery/BatteryChargingIndex")
            },
        ]
    },
    {
        path: '/security/',
        component: Frame,
        children: [
            {
                path: 'fire-index',
                meta: {
                    title: '消防用电'
                },
                component: () => import("@/view/security/fire/FireIndex")
            },
        ]
    },
    {
        path: '/security/',
        meta: {
            title: '异常设备'
        },
        component: Frame,
        children: [
            {
                path: 'current-abnormal-device',
                meta: {
                    title: '当前异常设备'
                },
                component: () => import("@/view/security/device/CurrentAbnormalDevice")
            },
            {
                path: 'previous-abnormal-device',
                meta: {
                    title: '历史异常设备'
                },
                component: () => import("@/view/security/device/PreviousAbnormalDevice")
            },
        ]
    },
    {
        path: '/security/',
        meta: {
            title: '事件管理'
        },
        component: Frame,
        children: [
            {
                path: 'current-events',
                meta: {
                    title: '当前事件'
                },
                component: () => import("@/view/security/events/CurrentEvents")
            },
            {
                path: 'previous-events',
                meta: {
                    title: '历史事件'
                },
                component: () => import("@/view/security/events/PreviousEvents")
            },
        ]
    },
    {
        path: '/security/',
        meta: {
            title: '预案管理'
        },
        component: Frame,
        children: [
            {
                path: 'establi-plans',
                meta: {
                    title: '预案编制'
                },
                component: () => import("@/view/security/plan/EstabliPlans")
            },
            {
                path: 'my-plans',
                meta: {
                    title: '我的预案'
                },
                component: () => import("@/view/security/plan/MyPlans")
            },
            {
                path: 'check-plans',
                meta: {
                    title: '预案审核'
                },
                component: () => import("@/view/security/plan/CheckPlans")
            },
            {
                path: 'current-plans',
                meta: {
                    title: '当前预案'
                },
                component: () => import("@/view/security/plan/CurrentPlans")
            },
            {
                path: 'current-plans-detail',
                meta: {
                    title: '当前预案',
                    // hiddenMenu: true
                },
                hiddenMenu: true,
                component: () => import("@/view/security/plan/CurrentPlanDetail")
            },
            {
                path: 'previous-plans',
                meta: {
                    title: '历史预案'
                },
                component: () => import("@/view/security/plan/PreviousPlans")
            },
            {
                path: 'open-plan',
                meta: {
                    title: '启动预案'
                },
                component: () => import("@/view/security/plan/OpenPlan")
            },
        ]
    },
]