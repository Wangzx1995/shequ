<template>
    <div>
        <el-dialog
            title="发布通知"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody specialPeople">
                <el-form
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    class="demo-ruleForm dialog-form"
                    label-position="left"
                >
                    <el-row>
                        <el-col :span="20">
                            <el-form-item
                                label="标题"
                                prop="title"
                            >
                                <el-input
                                    v-model="form.title"
                                    class="longInput"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="通知类型"
                                prop="type"
                            >
                                <Dictionary
                                    :typeCode="1020"
                                    v-model="form.type"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="通知内容"
                                prop="content"
                            >
                                <el-input
                                    v-model="form.content"
                                    class="longInput"
                                ></el-input>
                                <UeEditor />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
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
import imgUpload from "@/components/common/upload/imgUpload.vue";
import Dictionary from "@/components/common/select/Dictionary";
import UeEditor from "@/components/common/other/UeEditor";
import { getUserInfo } from "@/utils/auth";

export default {
    props: {},
    data() {
        return {
            dialogVisible: false,
            form: {
                content: null,
                title: null,
                type: null,
                issuer: getUserInfo().userName.id
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: "请选择类型",
                        trigger: "change"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur"
                    }
                ],
            }
        };
    },
    methods: {
        getUserInfo,
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
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.propertyButler.notice
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
        imgUpload,
        Dictionary,
        UeEditor
    }
};
</script>

<style>
</style>
