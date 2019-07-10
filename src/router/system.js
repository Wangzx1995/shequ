// 平台配置系统

import Frame from '@/components/frame/Frame'

export default [
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'community-info',
                meta: {
                    title: '小区信息'
                },
                iconClz: 'icon-x-order',
                component: () => import("@/view/system/CommunityInfo/CommunityInfo")
            },
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '物业管理'
        },
        iconClz: 'icon-x-wuyebaoxiu',
        component: Frame,
        children: [
            {
                path: 'property',
                meta: {
                    title: '物业信息'
                },
                component: () => import("@/view/system/estateManage/property")
            },
            {
                path: 'organization',
                meta: {
                    title: '组织架构管理'
                },
                component: () => import("@/view/system/estateManage/organization")
            },
            {
                path: 'job',
                meta: {
                    title: '职务管理'
                },
                component: () => import("@/view/system/estateManage/job")
            },
            {
                path: 'worker',
                meta: {
                    title: '员工管理'
                },
                component: () => import("@/view/system/estateManage/worker")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '账号管理'
        },
        iconClz: 'icon-x-wuyebaoxiu',
        component: Frame,
        children: [
            {
                path: 'account',
                meta: {
                    title: '平台账号管理'
                },
                component: () => import("@/view/system/accountManage/account")
            },
            {
                path: 'authority',
                meta: {
                    title: '角色权限管理'
                },
                component: () => import("@/view/system/accountManage/authority")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: 'APP设置'
        },
        iconClz: 'icon-x-wuyebaoxiu',
        component: Frame,
        children: [
            {
                path: 'ownerApp',
                meta: {
                    title: '业主APP'
                },
                component: () => import("@/view/system/AppSetting/ownerApp")
            },
            {
                path: 'propertyApp',
                meta: {
                    title: '物业APP'
                },
                component: () => import("@/view/system/AppSetting/propertyApp")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '设备管理'
        },
        iconClz: 'icon-x-wuyebaoxiu',
        component: Frame,
        children: [
            {
                path: 'manage',
                meta: {
                    title: '设备管理'
                },
                component: () => import("@/view/system/deviceManage/manage")
            },
            {
                path: 'label',
                meta: {
                    title: '设备标签'
                },
                component: () => import("@/view/system/deviceManage/label")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '地图管理'
        },
        iconClz: 'icon-x-wuyebaoxiu',
        component: Frame,
        children: [
            {
                path: 'coordinate',
                meta: {
                    title: '坐标系管理'
                },
                component: () => import("@/view/system/mapManage/coordinate")
            },
            {
                path: 'tagging',
                meta: {
                    title: '点位标注'
                },
                component: () => import("@/view/system/mapManage/tagging")
            }
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'dataDictionary',
                meta: {
                    title: '数据字典'
                },
                iconClz: 'icon-x-about_line',
                component: () => import("@/view/system/dataDictionary/dataDictionary"),
            },
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'configure',
                meta: {
                    title: '系统配置'
                },
                iconClz: 'icon-x-about_line',
                component: () => import("@/view/system/systemConfiguration/configure"),
            },
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'journal',
                meta: {
                    title: '日志管理'
                },
                iconClz: 'icon-x-about_line',
                component: () => import("@/view/system/logManage/journal")
            },
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'backups',
                meta: {
                    title: '系统备份'
                },
                iconClz: 'icon-x-about_line',
                component: () => import("@/view/system/systemBackup/backups")
            },
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [
            {
                path: 'aboutUs',
                meta: {
                    title: '关于我们'
                },
                iconClz: 'icon-x-about_line',
                component: () => import("@/view/system/aboutUs/aboutUs")
            },
        ]
    }
]