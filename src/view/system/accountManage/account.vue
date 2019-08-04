<template>
    <div class="system">
        <div class="com-main-inner selectBox">
            <el-form
                :inline="true"
                :model="selectForm"
                class="demo-form-inline"
                label-position="left"
            >
                <el-form-item label="角色名称">
                    <el-select
                        clearable
                        v-model="selectForm.roleCode"
                        placeholder="请选择角色名称"
                    >
                        <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.roleName"
                            :value="item.roleCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select
                        clearable
                        v-model="selectForm.deptCode"
                        placeholder="请选择所属部门"
                    >
                        <el-option
                            v-for="item in deptList"
                            :key="item.value"
                            :label="item.deptName"
                            :value="item.deptCode"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input
                        v-model="selectForm.search"
                        placeholder="关键词"
                    ></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button
                        type="primary"
                        @click="$refs.page.getList(1)"
                    >查询<i class="icon-x-sousuo el-icon--right"></i></el-button>
                </el-form-item>
            </el-form>
        </div>
        <br>
        <div class="com-page-header-wrap clear com-main-inner">
            <div class="com-main-inner-title">
                <div class="clear fr">
                    <template>
                        <el-button
                            type="primary"
                            plain
                            size="mini"
                            @click="openAddDialog()"
                        >新增</el-button>
                        <el-button
                            type="warning"
                            size="mini"
                            plain
                        >导入</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            plain
                        >导出</el-button>
                        <el-button
                            type="danger"
                            plain
                            size="mini"
                            @click="del(deleteList)"
                        >批量删除</el-button>
                    </template>
                </div>
                <span class="com-page-header-title">平台账号列表</span>
            </div>
            <div class="com-main-inner-table">
                <el-table
                    :data="list"
                    stripe
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{background:'#edf3f9',color:'#333333',padding:'0'}"
                    :cell-style="{padding:'0',color:'#999999'}"
                >
                    <el-table-column
                        type="selection"
                        width="50"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="realName"
                        label="姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="roleName"
                        label="角色名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userTel"
                        label="手机号码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createPerson"
                        label="创建人"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="deptName"
                        label="所属部门"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="260"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="icon-x-bianji"
                                @click="openUpdateDialog(scope.row)"
                            ></el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="danger"
                                icon="icon-x-shanchu"
                                @click="del([scope.row.id])"
                            ></el-button>
                            <span class="com-page-header-title line"></span>
                            <el-button
                                type="primary"
                                icon="icon-x-refresh"
                                @click="reset(scope.row)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <ctrlPage
                    :setPage="getList"
                    ref="page"
                    style="float:right;margin-top:20px;"
                />
            </div>
        </div>
        <addDialog
            ref="addDialog"
            :deptList="deptList"
            :roleList="roleList"
        />
        <updateDialog
            ref="updateDialog"
            :updateForm="updateForm"
            :deptList="deptList"
            :roleList="roleList"
        />
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import { getItemName } from "@/filters/index.js";
import addDialog from "@/components/system/accountManage/account/addDialog";
import updateDialog from "@/components/system/accountManage/account/updateDialog";

export default {
    name: "system-account",
    data() {
        return {
            selectForm: {
                search: "",
                roleCode: "",
                deptCode: "",
            },
            list: [],
            roleList: [],
            deptList: [],
            updateForm: {},
            resetForm: {},
            deleteList: [],
        };
    },
    mounted() {
        this.getRoleList()
        this.getDeptList()
        this.$refs.page.getList(1);
    },
    methods: {
        getItemName,
        //多选框
        handleSelectionChange(val) {
            this.deleteList = []
            for (let i in val) {
                this.deleteList.push(val[i].id)
            }
        },
        //获取角色名称
        getRoleList() {
            this.$systemApi.accountManage.roleSelect({
                pageNum: 1,
                pageSize: 999999,
                search: ''
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.roleList = res.data.list
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        //获取部门列表
        getDeptList() {
            this.$systemApi.estateManage.deptSelect({
                pageNum: 1,
                pageSize: 999999,
                search: ''
            })
                .then(res => {
                    if (res.code == 1000) {
                        this.deptList = res.data.list
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
        //打开编辑窗口
        openUpdateDialog(form) {
            this.updateForm = form;
            this.$refs.updateDialog.showDialog();
        },
        //打开新增窗口
        openAddDialog() {
            this.$refs.addDialog.showDialog();
        },
        //查询/获取List
        getList(pageIndex, rows, callback) {
            this.$systemApi.accountManage.userSelect({
                pageNum: pageIndex,
                pageSize: rows,
                search: this.selectForm.search,
                roleCode: this.selectForm.roleCode,
                deptCode: this.selectForm.deptCode,
            }).then((res) => {
                if (res.code == 1000) {
                    this.list = res.data.list
                    callback(this.list, res.data.total)
                } else {
                    this.$$alert({
                        message: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        //删除操作
        del(id) {
            if (id.length == 0) {
                this.$$message({
                    message: '请选择批量删除对象',
                    type: 'warning'
                })
                return
            }
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$systemApi.accountManage.userDelete({
                        ids: id
                    })
                        .then(res => {
                            if (res.code == 1000) {
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$refs.page.getList(1);
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: 'error'
                                })
                            }
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //重置密码
        reset(form) {
            this.resetForm = form
            this.resetForm.password = '88888888'
            this.$systemApi.accountManage.userUpdate(this.resetForm)
                .then(res => {
                    if (res.code == 1000) {
                        this.$$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.page.getList(1);
                    } else {
                        this.$$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
        },
    },
    components: {
        ctrlPage,
        addDialog,
        updateDialog
    }
};
</script>

<style>
</style>
