<template>
    <div>
        <el-dialog
            title="编辑片区"
            :visible.sync="dialogVisible"
            width="400px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
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
                            label="片区编号"
                            prop="code"
                        >
                            <el-input v-model="form.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="片区名称"
                            prop="name"
                        >
                            <el-input v-model="form.name"></el-input>
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
                <el-button @click="closeDialog()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入片区编号",
                        trigger: "blur"
                    }
                ]
            },
        };
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.form = row
            })
        },
        //关闭dialog
        closeDialog() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
        },
        //修改操作
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.houseProperty.area.update(this.form)
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
