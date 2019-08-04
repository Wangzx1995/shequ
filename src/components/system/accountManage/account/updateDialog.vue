<template>
    <div>
        <el-dialog
            title="编辑平台账号"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
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
                                v-model="form.userName"
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
                                v-model="form.roleCode"
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
                            <el-input v-model="form.realName"></el-input>
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
                                v-model="form.deptCode"
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
                            <el-input v-model="form.userTel"></el-input>
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
                                v-model="form.password"
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
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getItemName } from "@/filters/index.js";
export default {
    props: {
        deptList: Array,
        roleList: Array,
        updateForm: Object
    },
    data() {
        return {
            dialogVisible: false,
            form: {},
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
        };
    },
    watch: {
        updateForm() {
            this.form = this.updateForm;
        },
        dialogVisible() {
            if (this.dialogVisible == false) {
                this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
            }
        }
    },
    methods: {
        getItemName,
        //打开dialog
        showDialog() {
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //修改操作
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.form.deptName = this.getItemName(this.form.deptCode, this.deptList, 'deptCode', 'deptName')
                    this.form.roleName = this.getItemName(this.form.roleCode, this.roleList, 'roleCode', 'roleName')
                    this.$systemApi.accountManage.userUpdate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
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
    },
};
</script>

<style>
</style>
