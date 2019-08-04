import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefixProperty || '/'

export const property = {
    //文件上传
    upload: {
        upload(opts) {
            return doExec(`${apiPrefix}base/upload`, opts)
        },
    },
    //级联查询
    cascadeList: {
        cascadeList(opts) {
            return doExec(`${apiPrefix}peopelTenement/cascadeList`, opts, null, 'get')
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
            //续住list
            listContinue(opts) {
                return doExec(`${apiPrefix}peopelTenement/listContinue`, opts, null, 'get')
            },
            //续住修改
            updateContinue(opts) {
                return doExec(`${apiPrefix}peopelTenement/updateContinue`, opts, null, 'put')
            },
            //单元+房屋
            elementAndRoom(opts) {
                return doExec(`${apiPrefix}peopelTenement/elementAndRoom`, opts, null, 'get')
            },
        },
        //---------------------------访客管理----------------------------------------------------
        visitor: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}peopelVisitor/add`, opts)
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}peopelVisitor/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}peopelVisitor/list`, opts, null, 'get')
            },
            //查询被访人
            selectByUserName(opts) {
                return doExec(`${apiPrefix}peopelVisitor/selectByUserName`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}peopelVisitor/update`, opts, null, 'put')
            },
        },
        //---------------------------特殊人群管理----------------------------------------------------
        special: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}peopelRecord/add`, opts)
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}peopelRecord/list`, opts, null, 'get')
            },
        }
    },
    //停车管理
    parkingManagement: {
        //---------------------------停车场管理----------------------------------------------------
        parking: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}cyPark/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}cyPark/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}cyPark/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}cyPark/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}cyPark/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}cyPark/update`, opts, null, 'put')
            },
        },
        //---------------------------车辆管理----------------------------------------------------
        car: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}cyCar/add`, opts)
            },
            //导出
            createExcel(opts) {
                return doExec(`${apiPrefix}cyCar/createExcel`, opts, null, 'get')
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}cyCar/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}cyCar/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}cyCar/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}cyCar/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}cyCar/update`, opts, null, 'put')
            },
        },
        //---------------------------电动车管理----------------------------------------------------
        electric: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}cyElectrombile/add`, opts)
            },
            //导出
            createExcel(opts) {
                return doExec(`${apiPrefix}cyElectrombile/createExcel`, opts, null, 'get')
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}cyElectrombile/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}cyElectrombile/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}cyElectrombile/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}cyElectrombile/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}cyElectrombile/update`, opts, null, 'put')
            },
        }
    },
    //物业报修
    propertyWarranty: {
        //---------------------------受理派工----------------------------------------------------
        acceptAssignment: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}reRepairs/add`, opts)
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}reRepairs/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}reRepairs/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}reRepairs/update`, opts, null, 'put')
            },
        },
        handle: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}reFlow/add`, opts)
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}reFlow/list`, opts, null, 'get')
            },
        }
    },
    //物业管家
    propertyButler: {
        //---------------------------通知公告----------------------------------------------------
        notice: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}stewardInform/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}stewardInform/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}stewardInform/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}stewardInform/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}stewardInform/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}stewardInform/update`, opts, null, 'put')
            },
        },
        //---------------------------投诉建议----------------------------------------------------
        suggestions: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}stewardSuggest/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}stewardSuggest/delete`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}stewardSuggest/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}stewardSuggest/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}stewardSuggest/update`, opts, null, 'put')
            },
        },
    },
    //资源管理
    resourceManagement: {
        //---------------------------仓库管理----------------------------------------------------
        store: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/add`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}resourceWarehouse/update`, opts, null, 'put')
            },
        },
        //---------------------------物资管理----------------------------------------------------
        material: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}resourceManage/add`, opts)
            },
            //导出
            createExcel(opts) {
                return doExec(`${apiPrefix}resourceManage/createExcel`, opts, null, 'get')
            },
            //导入
            upload(opts) {
                return doExec(`${apiPrefix}resourceManage/upload`, opts)
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}resourceManage/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}resourceManage/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}resourceManage/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}resourceManage/list`, opts, null, 'get')
            },
            //出入库
            inOut(opts) {
                return doExec(`${apiPrefix}resourceManage/inOut`, opts, null, 'put')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}resourceManage/update`, opts, null, 'put')
            },
        },
        //---------------------------物资分类----------------------------------------------------
        classification: {
            //添加
            add(opts) {
                return doExec(`${apiPrefix}resourceClassify/add`, opts)
            },
            //级联查询
            cascade(opts) {
                return doExec(`${apiPrefix}resourceClassify/cascade`, opts, null, 'get')
            },
            //一级分类
            firstlist(opts) {
                return doExec(`${apiPrefix}resourceClassify/firstlist`, opts, null, 'get')
            },
            //删除
            delete(opts) {
                return doExec(`${apiPrefix}resourceClassify/delete`, opts, null, 'delete')
            },
            //批量删除
            deleteList(opts) {
                return doExec(`${apiPrefix}resourceClassify/deleteList`, opts, null, 'delete')
            },
            //详情
            detail(opts) {
                return doExec(`${apiPrefix}resourceClassify/detail`, opts, null, 'get')
            },
            //查询
            list(opts) {
                return doExec(`${apiPrefix}resourceClassify/list`, opts, null, 'get')
            },
            //修改
            update(opts) {
                return doExec(`${apiPrefix}resourceClassify/update`, opts, null, 'put')
            },
        },
    }
}