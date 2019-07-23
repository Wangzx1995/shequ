// 平台配置系统

import Frame from '@/components/frame/Frame'

export default [{
        path: '/system/',
        component: Frame,
        children: [{
            path: 'CommunityInfo-index',
            meta: {
                title: '小区信息'
            },
            iconClz: 'icon-x-ziliao',
            component: () =>
                import ("@/view/system/CommunityInfo/index")
        }, ]
    },
    {
        path: '/system/',
        meta: {
            title: '物业管理'
        },
        iconClz: 'icon-x-wuyeguanli',
        component: Frame,
        children: [{
                path: 'estateManage-property',
                meta: {
                    title: '物业信息'
                },
                component: () =>
                    import ("@/view/system/estateManage/property")
            },
            {
                path: 'estateManage-organization',
                meta: {
                    title: '组织架构管理'
                },
                component: () =>
                    import ("@/view/system/estateManage/organization")
            },
            {
                path: 'estateManage-job',
                meta: {
                    title: '职务管理'
                },
                component: () =>
                    import ("@/view/system/estateManage/job")
            },
            {
                path: 'estateManage-worker',
                meta: {
                    title: '员工管理'
                },
                component: () =>
                    import ("@/view/system/estateManage/worker")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '账号管理'
        },
        iconClz: 'icon-x-zhanghaoguanli',
        component: Frame,
        children: [{
                path: 'accountManage-account',
                meta: {
                    title: '平台账号管理'
                },
                component: () =>
                    import ("@/view/system/accountManage/account")
            },
            {
                path: 'accountManage-authority',
                meta: {
                    title: '角色权限管理'
                },
                component: () =>
                    import ("@/view/system/accountManage/authority")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: 'APP设置'
        },
        iconClz: 'icon-x-app1',
        component: Frame,
        children: [{
                path: 'AppSetting-ownerApp',
                meta: {
                    title: '业主APP'
                },
                component: () =>
                    import ("@/view/system/AppSetting/ownerApp")
            },
            {
                path: 'AppSetting-propertyApp',
                meta: {
                    title: '物业APP'
                },
                component: () =>
                    import ("@/view/system/AppSetting/propertyApp")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '设备管理'
        },
        iconClz: 'icon-x-shebeiguanli1',
        component: Frame,
        children: [{
                path: 'deviceManage-manage',
                meta: {
                    title: '设备管理'
                },
                component: () =>
                    import ("@/view/system/deviceManage/manage")
            },
            {
                path: 'deviceManage-label',
                meta: {
                    title: '设备标签'
                },
                component: () =>
                    import ("@/view/system/deviceManage/label")
            }
        ]
    },
    {
        path: '/system/',
        meta: {
            title: '地图管理'
        },
        iconClz: 'icon-x-ditu',
        component: Frame,
        children: [{
                path: 'mapManage-coordinate',
                meta: {
                    title: '坐标系管理'
                },
                component: () =>
                    import ("@/view/system/mapManage/coordinate")
            },
            {
                path: 'mapManage-tagging',
                meta: {
                    title: '点位标注'
                },
                component: () =>
                    import ("@/view/system/mapManage/tagging")
            }
        ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [{
            path: 'dataDictionary-index',
            meta: {
                title: '数据字典'
            },
            iconClz: 'icon-x-shujuzidian',
            component: () =>
                import ("@/view/system/dataDictionary/index"),
        }, ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [{
            path: 'systemConfiguration-index',
            meta: {
                title: '系统配置'
            },
            iconClz: 'icon-x-yunying',
            component: () =>
                import ("@/view/system/systemConfiguration/index"),
        }, ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [{
            path: 'logManage-index',
            meta: {
                title: '日志管理'
            },
            iconClz: 'icon-x-rizhiguanli',
            component: () =>
                import ("@/view/system/logManage/index")
        }, ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [{
            path: 'systemBackup-index',
            meta: {
                title: '系统备份'
            },
            iconClz: 'icon-x-xitongbeifenguanli',
            component: () =>
                import ("@/view/system/systemBackup/index")
        }, ]
    },
    {
        path: '/system/',
        component: Frame,
        children: [{
            path: 'aboutUs-index',
            meta: {
                title: '关于我们'
            },
            iconClz: 'icon-x-guanyuwomen',
            component: () =>
                import ("@/view/system/aboutUs/index")
        }, ]
    }
]