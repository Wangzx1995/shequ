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
        <el-dialog
            title="新增平台账号"
            :visible.sync="dialogVisible.add"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="addForm"
                :rules="rules"
                ref="addForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="用户名"
                            prop="userName"
                        >
                            <el-input v-model="addForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="角色名称"
                            prop="roleCode"
                        >
                            <el-select
                                clearable
                                v-model="addForm.roleCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="姓名"
                            prop="realName"
                        >
                            <el-input v-model="addForm.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属部门"
                            prop="deptCode"
                        >
                            <el-select
                                clearable
                                v-model="addForm.deptCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="手机号码"
                            prop="userTel"
                        >
                            <el-input v-model="addForm.userTel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="密码"
                            prop="password"
                        >
                            <el-input
                                v-model="addForm.password"
                                placeholder="默认88888888"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="add()"
                >保 存</el-button>
                <el-button @click="dialogVisible.add = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="编辑平台账号"
            :visible.sync="dialogVisible.update"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="updateForm"
                :rules="rules"
                ref="updateForm"
                label-width="100px"
                class="demo-ruleForm dialog-form"
                label-position="left"
            >
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="用户名"
                            prop="userName"
                        >
                            <el-input
                                v-model="updateForm.userName"
                                disabled=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="角色名称"
                            prop="roleCode"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.roleCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="姓名"
                            prop="realName"
                        >
                            <el-input v-model="updateForm.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="所属部门"
                            prop="deptCode"
                        >
                            <el-select
                                clearable
                                v-model="updateForm.deptCode"
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
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="手机号码"
                            prop="userTel"
                        >
                            <el-input v-model="updateForm.userTel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="密码"
                            prop="password"
                        >
                            <el-input
                                v-model="updateForm.password"
                                placeholder="默认88888888"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="update()"
                >保 存</el-button>
                <el-button @click="dialogVisible.update = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ctrlPage from "@/components/common/other/CtrlPage";
import { getItemName } from "@/filters/index.js";

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
            roleList: [{
                roleCode: 1,
                roleName: '啊啊啊'
            }, {
                roleCode: 2,
                roleName: '嗯嗯嗯'
            }],
            deptList: [],
            addForm: {
                deptCode: '',
                deptName: '',
                password: '',
                realName: '',
                roleCode: '',
                roleName: '',
                userName: '',
                userTel: ''
            },
            updateForm: {},
            resetForm: {},
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                roleCode: [
                    {
                        required: true,
                        message: "请选择角色名称",
                        trigger: "change"
                    }
                ],
                realName: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    }
                ],
                userTel: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    }
                ],
            },
            dialogVisible: {
                add: false,
                update: false
            },
            deleteList: [],
        };
    },
    mounted() {
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
            this.dialogVisible.update = true
        },
        //打开新增窗口
        openAddDialog() {
            this.dialogVisible.add = true
            this.$nextTick(() => {
                this.$refs['addForm'].resetFields();
            })
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
        //新增操作
        add() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    if (!this.addForm.password) {
                        this.addForm.password = '88888888'
                    }
                    this.addForm.deptName = this.getItemName(this.addForm.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.addForm.roleName = this.getItemName(this.addForm.roleCode, this.roleList, 'roleCode', 'roleName')
                    this.$systemApi.accountManage.userCreate(this.addForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.add = false
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
                }
            });
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
        //修改操作
        update() {
            this.$refs.updateForm.validate(valid => {
                if (valid) {
                    this.updateForm.deptName = this.getItemName(this.updateForm.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.updateForm.roleName = this.getItemName(this.updateForm.roleCode, this.roleList, 'roleCode', 'roleName')
                    this.$systemApi.accountManage.userUpdate(this.updateForm)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible.update = false
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
                }
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
        ctrlPage
    }
};
</script>

<style>
</style>
