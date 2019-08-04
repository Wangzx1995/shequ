<template>
    <div>
        <el-dialog
            title="编辑物资分类"
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
                            label="分类名称"
                            prop="name"
                        >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="一级分类"
                            prop="grade"
                        >
                            <Dictionary
                                :typeCode="1022"
                                v-model="form.grade"
                            />
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
import Dictionary from "@/components/common/select/Dictionary";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入分类名称",
                        trigger: "blur"
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
            this.$propertyApi.resourceManagement.classification
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
                    this.$propertyApi.resourceManagement.classification
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
        }
    },
    components: {
        Dictionary
    }
};
</script>

<style>
</style>
