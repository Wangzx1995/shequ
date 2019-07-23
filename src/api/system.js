import { doExec } from '@/api/request'

const apiPrefix = window.apiPrefixSystem || '/'

export const system = {
    upload: {
        upload(opts) {
            return doExec(`${apiPrefix}base/upload`, opts)
        },
    },
    //小区信息
    CommunityInfo: {
        //查询小区信息
        select(opts) {
            return doExec(`${apiPrefix}communityInfo/select`, opts, null, 'get')
        },
        //修改小区信息
        update(opts) {
            return doExec(`${apiPrefix}communityInfo/update`, opts, null, 'put')
        },
    },
    //账号管理
    accountManage: {
        //新增权限
        accessCreate(opts) {
            return doExec(`${apiPrefix}plaAccount/accessCreate`, opts)
        },
        //删除权限
        accessDelete(opts) {
            return doExec(`${apiPrefix}plaAccount/accessDelete`, opts, null, 'delete')
        },
        //查询权限
        accessSelect(opts) {
            return doExec(`${apiPrefix}plaAccount/accessSelect`, opts, null, 'get')
        },
        //修改权限
        accessUpdate(opts) {
            return doExec(`${apiPrefix}plaAccount/accessUpdate`, opts, null, 'put')
        },
        //新增角色
        roleCreate(opts) {
            return doExec(`${apiPrefix}plaAccount/roleCreate`, opts)
        },
        //删除角色
        roleDelete(opts) {
            return doExec(`${apiPrefix}plaAccount/roleDelete`, opts, null, 'delete')
        },
        //查询角色对应权限
        roleGetAccess(opts) {
            return doExec(`${apiPrefix}plaAccount/roleGetAccess`, opts, null, 'get')
        },
        //查询角色
        roleSelect(opts) {
            return doExec(`${apiPrefix}plaAccount/roleSelect`, opts, null, 'get')
        },
        //修改角色
        roleUpdate(opts) {
            return doExec(`${apiPrefix}plaAccount/roleUpdate`, opts, null, 'put')
        },
        //新增用户
        userCreate(opts) {
            return doExec(`${apiPrefix}plaAccount/userCreate`, opts)
        },
        //删除用户
        userDelete(opts) {
            return doExec(`${apiPrefix}plaAccount/userDelete`, opts, null, 'delete')
        },
        //用户详情
        userGet(opts) {
            return doExec(`${apiPrefix}plaAccount/userGet`, opts, null, 'get')
        },
        //查询用户列表
        userSelect(opts) {
            return doExec(`${apiPrefix}plaAccount/userSelect`, opts, null, 'get')
        },
        //修改用户基本信息
        userUpdate(opts) {
            return doExec(`${apiPrefix}plaAccount/userUpdate`, opts, null, 'put')
        },
    },
    //数据字典
    dataDictionary: {
        //根据字段Code查询字典（可做其他下拉选查询）
        // codeToDic(opts) {
        //     return doExec(`${apiPrefix}dictionary/codeToDic`, opts, null, 'get')
        // },
        //增加字典类型
        dicCreate(opts) {
            return doExec(`${apiPrefix}dictionary/dicCreate`, opts)
        },
        //删除字典类型
        dicDelete(opts) {
            return doExec(`${apiPrefix}dictionary/dicDelete`, opts, null, 'delete')
        },
        //字典表关键字查询
        dicSearch(opts) {
            return doExec(`${apiPrefix}dictionary/dicSearch`, opts, null, 'get')
        },
        //修改类型字典
        dicUpdate(opts) {
            return doExec(`${apiPrefix}dictionary/dicUpdate`, opts, null, 'put')
        },
        //根据类型查询字典（可做其他下拉选查询）
        typeToDic(opts) {
            return doExec(`${apiPrefix}dictionary/typeToDic`, opts, null, 'get')
        },
        //修改类型（是否有效也可以使用）
        typeUpdate(opts) {
            return doExec(`${apiPrefix}dictionary/typeUpdate`, opts, null, 'put')
        },
    },
    //物业管理
    estateManage: {
        //----------------------------物业管理------------------------------------------- 
        //查询物业信息
        proSelect(opts) {
            return doExec(`${apiPrefix}proManage/proSelect`, opts, null, 'get')
        },
        //修改物业信息
        proUpdate(opts) {
            return doExec(`${apiPrefix}proManage/proUpdate`, opts, null, 'put')
        },
        //----------------------------组织架构管理------------------------------------------- 
        //新增部门
        deptCreate(opts) {
            return doExec(`${apiPrefix}proManage/deptCreate`, opts)
        },
        //查询部门
        deptSelect(opts) {
            return doExec(`${apiPrefix}proManage/deptSelect`, opts, null, 'get')
        },
        //修改部门
        deptUpdate(opts) {
            return doExec(`${apiPrefix}proManage/deptUpdate`, opts, null, 'put')
        },
        //删除部门
        deptDelete(opts) {
            return doExec(`${apiPrefix}proManage/deptDelete`, opts, null, 'delete')
        },
        //---------------------------职务管理-------------------------------------------- 
        //新增职务
        dutyCreate(opts) {
            return doExec(`${apiPrefix}proManage/dutyCreate`, opts)
        },
        //查询职务
        dutySelect(opts) {
            return doExec(`${apiPrefix}proManage/dutySelect`, opts, null, 'get')
        },
        //修改职务
        dutyUpdate(opts) {
            return doExec(`${apiPrefix}proManage/dutyUpdate`, opts, null, 'put')
        },
        //删除职务
        dutyDelete(opts) {
            return doExec(`${apiPrefix}proManage/dutyDelete`, opts, null, 'delete')
        },
        //----------------------------员工管理------------------------------------------- 
        //新增员工
        staffCreate(opts) {
            return doExec(`${apiPrefix}proManage/staffCreate`, opts)
        },
        //查询员工
        staffSelect(opts) {
            return doExec(`${apiPrefix}proManage/staffSelect`, opts, null, 'get')
        },
        //修改员工
        staffUpdate(opts) {
            return doExec(`${apiPrefix}proManage/staffUpdate`, opts, null, 'put')
        },
        //删除员工
        staffDelete(opts) {
            return doExec(`${apiPrefix}proManage/staffDelete`, opts, null, 'delete')
        },
    },
    //系统配置
    systemConfiguration: {
        //新建配置
        cfgCreate(opts) {
            return doExec(`${apiPrefix}systemConfig/cfgCreate`, opts)
        },
        //删除配置
        cfgDelete(opts) {
            return doExec(`${apiPrefix}systemConfig/cfgDelete`, opts, null, 'delete')
        },
        //配置详情
        cfgGet(opts) {
            return doExec(`${apiPrefix}systemConfig/cfgGet`, opts, null, 'get')
        },
        //配置列表
        cfgList(opts) {
            return doExec(`${apiPrefix}systemConfig/cfgList`, opts, null, 'get')
        },
        //修改配置
        cfgUpdate(opts) {
            return doExec(`${apiPrefix}systemConfig/cfgUpdate`, opts, null, 'put')
        },
    },
}