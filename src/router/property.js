// 智慧物业服务
import Frame from '@/components/frame/Frame'
export default [{
        path: '/property/',
        component: Frame,
        children: [{
            path: 'workbench-index',
            meta: {
                title: '工作台'
            },
            iconClz: 'icon-x-gongzuotai',
            component: () =>
                import ('@/view/property/workbench/index')
        }, ]
    },
    {
        path: '/property/',
        meta: {
            title: '房产管理'
        },
        iconClz: 'icon-x-caidanlan',
        component: Frame,
        children: [{
                path: 'houseProperty-area',
                meta: {
                    title: '片区管理'
                },
                component: () =>
                    import ('@/view/property/houseProperty/area')
            },
            {
                path: 'houseProperty-building',
                meta: {
                    title: '楼栋管理'
                },
                component: () =>
                    import ('@/view/property/houseProperty/building')
            },
            {
                path: 'houseProperty-unit',
                meta: {
                    title: '单元管理'
                },
                component: () =>
                    import ('@/view/property/houseProperty/unit')
            },
            {
                path: 'houseProperty-house',
                meta: {
                    title: '住房管理'
                },
                component: () =>
                    import ('@/view/property/houseProperty/house')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '人员管理'
        },
        iconClz: 'icon-x-zhanghaoguanli',
        component: Frame,
        children: [{
                path: 'personManagement-household',
                meta: {
                    title: '住户管理'
                },
                component: () =>
                    import ('@/view/property/personManagement/household')
            },
            {
                path: 'personManagement-visitor',
                meta: {
                    title: '访客管理'
                },
                component: () =>
                    import ('@/view/property/personManagement/visitor')
            },
            {
                path: 'personManagement-special',
                meta: {
                    title: '特殊人群管理'
                },
                component: () =>
                    import ('@/view/property/personManagement/special')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '停车管理'
        },
        iconClz: 'icon-x-tingcheguanli1',
        component: Frame,
        children: [{
                path: 'parkingManagement-parking',
                meta: {
                    title: '停车场管理'
                },
                component: () =>
                    import ('@/view/property/parkingManagement/parking')
            },
            {
                path: 'parkingManagement-car',
                meta: {
                    title: '车辆管理'
                },
                component: () =>
                    import ('@/view/property/parkingManagement/car')
            },
            {
                path: 'parkingManagement-electric',
                meta: {
                    title: '电动车管理'
                },
                component: () =>
                    import ('@/view/property/parkingManagement/electric ')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '生活缴费'
        },
        iconClz: 'icon-x-shenghuojiaofei',
        component: Frame,
        children: [{
                path: 'livingExpenses-payManagement',
                meta: {
                    title: '缴费管理'
                },
                component: () =>
                    import ('@/view/property/livingExpenses/payManagement')
            },
            {
                path: 'livingExpenses-payHistory',
                meta: {
                    title: '缴费历史'
                },
                component: () =>
                    import ('@/view/property/livingExpenses/payHistory')
            },
            {
                path: 'livingExpenses-paySetting',
                meta: {
                    title: '缴费设置'
                },
                component: () =>
                    import ('@/view/property/livingExpenses/paySetting')
            },
            {
                path: 'livingExpenses-readingManagement',
                meta: {
                    title: '抄表管理'
                },
                component: () =>
                    import ('@/view/property/livingExpenses/readingManagement')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '物业报修'
        },
        iconClz: 'icon-x-wuyebaoxiu1',
        component: Frame,
        children: [{
                path: 'propertyWarranty-acceptAssignment',
                meta: {
                    title: '受理派工'
                },
                component: () =>
                    import ('@/view/property/propertyWarranty/acceptAssignment')
            },
            {
                path: 'propertyWarranty-handle',
                meta: {
                    title: '报修处理'
                },
                component: () =>
                    import ('@/view/property/propertyWarranty/handle')
            },
            {
                path: 'propertyWarranty-history',
                meta: {
                    title: '历史报修'
                },
                component: () =>
                    import ('@/view/property/propertyWarranty/history')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '物业管家'
        },
        iconClz: 'icon-x-wodeguanjia',
        component: Frame,
        children: [{
                path: 'propertyButler-notice',
                meta: {
                    title: '通知公告'
                },
                component: () =>
                    import ('@/view/property/propertyButler/notice')
            },
            {
                path: 'propertyButler-suggestions',
                meta: {
                    title: '投诉建议'
                },
                component: () =>
                    import ('@/view/property/propertyButler/suggestions')
            },
            {
                path: 'propertyButler-vote',
                meta: {
                    title: '社区投票'
                },
                component: () =>
                    import ('@/view/property/propertyButler/vote')
            },
            {
                path: 'propertyButler-neighborhood',
                meta: {
                    title: '领里管理'
                },
                component: () =>
                    import ('@/view/property/propertyButler/neighborhood')
            },
        ]
    },
    {
        path: '/property/',
        meta: {
            title: '资源管理'
        },
        iconClz: 'icon-x-wuziguanli',
        component: Frame,
        children: [{
                path: 'resourceManagement-store',
                meta: {
                    title: '仓库管理'
                },
                component: () =>
                    import ('@/view/property/resourceManagement/store')
            },
            {
                path: 'resourceManagement-material',
                meta: {
                    title: '物资管理'
                },
                component: () =>
                    import ('@/view/property/resourceManagement/material')
            },
            {
                path: 'resourceManagement-classification',
                meta: {
                    title: '物资分类'
                },
                component: () =>
                    import ('@/view/property/resourceManagement/classification')
            },
        ]
    },
]