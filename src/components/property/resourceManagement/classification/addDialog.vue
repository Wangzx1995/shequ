<template>
    <div>
        <el-dialog
            title="新增物资分类"
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
                    @click="add()"
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
            form: {
                grade: null,
                name: null
            },
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
        showDialog() {
            this.dialogVisible = true;
        },
        //关闭dialog
        closeDialog() {
            this.dialogVisible = false;
        },
        //新增操作
        add() {
            // console.log(this.form);
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.resourceManagement.classification
                        .add(this.form)
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
