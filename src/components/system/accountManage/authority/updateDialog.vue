<template>
    <div>
        <el-dialog
            title="编辑角色权限"
            :visible.sync="dialogVisible"
            width="400px"
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
                    <el-col :span="24">
                        <el-form-item
                            label="角色编号"
                            prop="roleCode"
                        >
                            <el-input v-model="form.roleCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="角色名称"
                            prop="roleName"
                        >
                            <el-input v-model="form.roleName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="排序"
                            prop="sort"
                        >
                            <el-input v-model="form.sort"></el-input>
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
export default {
    props: {
        updateForm: Object
    },
    data() {
        return {
            dialogVisible: false,
            form: {},
            rules: {
                roleCode: [
                    {
                        required: true,
                        message: "请输入角色编号",
                        trigger: "blur"
                    }
                ],
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ]
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
                    this.$systemApi.accountManage.roleUpdate(this.form)
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
