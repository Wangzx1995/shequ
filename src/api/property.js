import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefixProperty || '/'

export const property = {
    //文件上传
    upload: {
        upload(opts) {
            return doExec(`${apiPrefix}base/upload`, opts)
        },
    },
    //房产管理
    houseProperty: {
        //---------------------------片区管理----------------------------------------------------
        area: {
            //片区添加
            add(opts) {
                return doExec(`${apiPrefix}hpArea/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}hpArea/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}hpArea/deleteList`, opts, null, 'delete')
            },
            //片区详情
            detail(opts) {
                return doExec(`${apiPrefix}hpArea/detail`, opts, null, 'get')
            },
            //片区查询
            list(opts) {
                return doExec(`${apiPrefix}hpArea/list`, opts, null, 'get')
            },
            //片区修改
            update(opts) {
                return doExec(`${apiPrefix}hpArea/update`, opts, null, 'put')
            },
        },
        //---------------------------楼栋管理----------------------------------------------------
        building: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}hpBuilding/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}hpBuilding/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}hpBuilding/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}hpBuilding/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}hpBuilding/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}hpBuilding/update`, opts, null, 'put')
            },
            //导出
            createExcel(opts) {
                return doExec(`${apiPrefix}hpBuilding/createExcel`, opts, null, 'get')
            },
            //导入
            upload(opts) {
                return doExec(`${apiPrefix}hpBuilding/upload`, opts)
            },
        },
        //---------------------------单元管理----------------------------------------------------
        unit: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}hpElement/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}hpElement/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}hpElement/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}hpElement/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}hpElement/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}hpElement/update`, opts, null, 'put')
            },
        },
        //---------------------------住房管理----------------------------------------------------
        house: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}hpRoom/add`, opts)
            },
            //审核
            approval(opts) {
                return doExec(`${apiPrefix}hpRoom/approval`, opts, null, 'put')
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}hpRoom/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}hpRoom/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}hpRoom/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}hpRoom/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}hpRoom/update`, opts, null, 'put')
            },
        },
    },
    //人员管理
    personManagement: {
        //---------------------------住户管理----------------------------------------------------
        household: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}peopelTenement/add`, opts)
            },
            //续住
            addContinue(opts) {
                return doExec(`${apiPrefix}peopelTenement/addContinue`, opts)
            },
            //审核
            approval(opts) {
                return doExec(`${apiPrefix}peopelTenement/approval`, opts, null, 'put')
            },
            //级联查询
            cascade(opts) {
                return doExec(`${apiPrefix}peopelTenement/cascade`, opts, null, 'get')
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}peopelTenement/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}peopelTenement/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}peopelTenement/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}peopelTenement/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}peopelTenement/update`, opts, null, 'put')
            },
            //特殊人群批量删除同新增
            updateList(opts) {
                return doExec(`${apiPrefix}peopelTenement/updateList`, opts, null, 'delete')
            },
        },
    }
}