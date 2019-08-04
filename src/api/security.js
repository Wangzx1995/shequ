import {
    doExec
} from '@/api/request'

const apiPrefix = window.apiPrefixSecurity || '/'

export const security = {
    // 消防用电
    fire: {
        get (opts) {
            return doExec(`${apiPrefix}fireElectricity/getUrl`, opts, null, 'get')
        }
    },
    // 事件管理
    event: {
        list (opts) {
            // return doExec(`${apiPrefix}securityLog/selectList`, opts, null, 'get')
            return doExec(`${apiPrefix}secInc/eventSel`, opts)
        },
        get (opts) {
            return doExec(`${apiPrefix}secInc/eventGet`, opts, null, 'get')
        },
        add (opts) {
            return doExec(`${apiPrefix}secInc/eventCreate`, opts)
        }
    },
    // 异常设备
    device: {
        // 异常设备查询
        list (opts) {
            return doExec(`${apiPrefix}abnormalEquip/select`, opts)
        },
        // 异常设备详情
        get (opts) {
            return doExec(`${apiPrefix}abnormalEquip/getInfo`, opts, null, 'get')
        },
        // 修改异常设备（撤销、结束、指派）
        update (opts) {
            return doExec(`${apiPrefix}abnormalEquip/update`, opts)
        }
    },
    // 预案管理
    plan: {
        // 预案编制列表
        establiPlanList (opts) {
            return doExec(`${apiPrefix}preArranged/preEditSel`, opts, null, 'get')
        },
        // 预案编制详情
        establiPlanGet (opts) {
            return doExec(`${apiPrefix}preArranged/preGet`, opts, null, 'get')
        },
        // 添加预案人员配置
        addEstabliPlanUserGroup (opts) {
            return doExec(`${apiPrefix}preArranged/groupCreate`, opts)
        },
        // 修改预案人员配置
        editEstabliPlanUserGroup (opts) {
            return doExec(`${apiPrefix}preArranged/groupUpdate`, opts, null, 'put')
        },
        // 删除预案人员配置
        delEstabliPlanUserGroup (opts) {
            return doExec(`${apiPrefix}preArranged/groupDelete`, opts, null, 'delete')
        },
        // 预案人员配置查询
        establiPlanUserGroup (opts) {
            return doExec(`${apiPrefix}preArranged/groupSelect`, opts, null, 'get')
        },
        // 添加/修改响应预案的预案组下拉 列表
        establiPlanUserGroupAllList (opts) {
            return doExec(`${apiPrefix}preArranged/groupAll`, opts, null, 'get')
        },
        // 预案等级查询
        establiPlanLevelGet (opts) {
            return doExec(`${apiPrefix}preArranged/levelToStep`, opts, null, 'get')
        },
        // 预案等级修改
        establiPlanLevelEdit (opts) {
            return doExec(`${apiPrefix}preArranged/preLevelStep`, opts)
        },
        // 我的预案列表
        myPlanList (opts) {
            return doExec(`${apiPrefix}preArranged/selMyPre`, opts)
        },
        // 新增我的预案
        myPlanAdd (opts) {
            return doExec(`${apiPrefix}preArranged/preCreate`, opts)
        },
        // 修改我的预案
        myPlanUpdate (opts) {
            return doExec(`${apiPrefix}preArranged/preUpdate`, opts, null, 'put')
        },
        // 详情
        myPlanGet (opts) {
            return doExec(`${apiPrefix}preArranged/preGet`, opts, null, 'get')
        },
        // 删除我的预案
        myPlanDel (opts) {
            return doExec(`${apiPrefix}preArranged/delMyPres`, opts, null, 'delete')
        },
        // 当前预案查询 1当前 2历史
        currentPlanList (opts) {
            return doExec(`${apiPrefix}preArranged/currentPreSel`, opts, null, 'get')
        },
        // 可启动预案列表
        openPlanList (opts) {
            return doExec(`${apiPrefix}preArranged/startPreSel`, opts, null, 'get')
        },
        // 启动预案
        startPre (opts) {
            return doExec(`${apiPrefix}preArranged/startPre`, opts)
        }
    },
    // 视频监控
    video: {
        // 根据小区单元查询摄像头
        findVideosByUnits (opts) {
            return doExec(`${apiPrefix}videoMonitor/eIdGetEquip`, opts, null, 'get')
        },
        // 查询收藏夹
        findBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/favSelect`, opts, null, 'get')
        },
        // 添加收藏夹
        addBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/favCreate`, opts)
        },
        // 修改收藏夹
        editBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/favUpdate`, opts, null, 'put')
        },
        // 删除收藏夹
        delBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/favDelete`, opts, null, 'delete')
        },
        // 添加监控到收藏夹或者快捷播
        addVideoToBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/quickAdd`, opts)
        },
        // 删除收藏夹或者快捷播放里的监控
        delVideoToBookmark (opts) {
            return doExec(`${apiPrefix}videoMonitor/favQPlayDel`, opts, null, 'delete')
        },
        // 查询用户收藏的监控
        findCollectionVideo (opts) {
            return doExec(`${apiPrefix}videoMonitor/favSelUser`, opts, null, 'get')
        },
        // 查询快捷播放列表
        findQuickList (opts) {
            return doExec(`${apiPrefix}videoMonitor/selQPlaylist`, opts, null, 'get')
        },
        // 添加快捷播放组
        addQuick (opts) {
            return doExec(`${apiPrefix}videoMonitor/quickAdd`, opts)
        },
        // 修改快捷播放组
        editQuick (opts) {
            return doExec(`${apiPrefix}videoMonitor/quickPlayUpd`, opts, null, 'put')
        },
        // 删除快捷播放组
        delQuick (opts) {
            return doExec(`${apiPrefix}videoMonitor/quickPlayDel`, opts, null, 'delete')
        },
        // 保存播放列表到快捷播放
        addPlayListToQuick (opts) {
            return doExec(`${apiPrefix}videoMonitor/quickPlayAdd`, opts)
        }
    },
    // 通行记录
    record: {
        // 车辆
        carList (opts) {
            return doExec(`${apiPrefix}accessRecords/cardataList`, opts, null, 'get')
        }
    }
}