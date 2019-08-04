<template>
    <div>
        <el-dialog
            title="修改车辆"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody">
                <div>
                    <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                        label-width="110px"
                        class="demo-ruleForm dialog-form"
                        label-position="left"
                    >
                        <div>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="仓库编号"
                                        prop="code"
                                    >
                                        <el-input v-model="form.code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="负责人"
                                        prop="linkman"
                                    >
                                        <el-tag
                                            :key="user.id"
                                            v-for="(user,index) in form.users"
                                            class="green"
                                            closable
                                            @close="closeUsers(index)"
                                        >{{ user.userName }}</el-tag>
                                        <el-button
                                            v-if="!form.users.length"
                                            class="custom-mini green"
                                            icon="icon-x-renyuan"
                                            size="mini"
                                            style="padding:0 10px"
                                            @click="selectAssignUser"
                                            type="primary"
                                            plain
                                        >选择人员</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="仓库名称"
                                        prop="name"
                                    >
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="联系方式"
                                        prop="phone"
                                    >
                                        <el-input v-model="form.phone"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="仓库地址"
                                        prop="address"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model="form.address"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="备注"
                                        prop="remark"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model="form.remark"
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </div>
            </div>
            <div
                slot="footer"
                class="dialog-footer"
                style="text-align:center"
            >
                <el-button
                    type="primary"
                    @click="update()"
                >保 存</el-button>
                <el-button @click="closeDialog()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DeptTree from "@/components/common/tree/personManagement/DeptTree";
export default {
    data() {
        const _this = this;
        return {
            dialogVisible: false,
            form: {
                address: null,
                code: null,
                linkman: null,
                name: null,
                phone: null,
                remark: null,
                users: []
            },
            rules: {
                address: [
                    {
                        required: true,
                        message: "请输入仓库地址",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请输入仓库编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入仓库名称",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur"
                    }
                ],
                linkman: [
                    {
                        required: true,
                        validator(rule, value, callback) {
                            if (_this.form.users.length) {
                                callback();
                            } else {
                                callback(new Error("请选择负责人"));
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        //打开dialog
        showDialog(id) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.getDetailForm(id);
            });
        },
        //关闭dialog
        closeDialog() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
        },
        getDetailForm(id) {
            this.$propertyApi.resourceManagement.store
                .detail({
                    id: id
                })
                .then(res => {
                    if (res.code == 1000) {
                        this.form = res.data;
                        this.form.users = [];
                    } else {
                        this.$$message({
                            message: res.message,
                            type: "error"
                        });
                    }
                });
        },
        //修改操作
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.parkingManagement.car
                        .update(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false;
                                this.$$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.$parent.$refs.page.getList(1);
                                this.$refs.form.resetFields();
                            } else {
                                this.$$message({
                                    message: res.message,
                                    type: "error"
                                });
                            }
                        });
                }
            });
        },
        // 选择指派人
        selectAssignUser() {
            this.$refs.DeptTree.open(users => {
                this.form.users = users;
                this.form.linkman = users[0].id;
                if (users.length) {
                    this.$refs.form.validateField("user");
                }
            });
        },
        //删除已选人员
        closeUsers(index) {
            this.form.users.splice(index, 1);
            this.form.linkman = null;
        }
    },
    components: {
        DeptTree
    }
};
</script>

<style>
</style>
