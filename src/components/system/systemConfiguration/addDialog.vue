<template>
    <div>
        <el-dialog
            title="新增系统配置"
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
                            label="配置项"
                            prop="cfgItem"
                        >
                            <el-input v-model="form.cfgItem"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置类型"
                            prop="cfgType"
                        >
                            <el-input v-model="form.cfgType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置项名"
                            prop="cfgItemName"
                        >
                            <el-input v-model="form.cfgItemName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="配置选项"
                            prop="cfgOption"
                        >
                            <el-input v-model="form.cfgOption"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="配置值"
                            prop="cfgValues"
                        >
                            <el-input v-model="form.cfgValues"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="默认值"
                            prop="cfgDefault"
                        >
                            <el-input v-model="form.cfgDefault"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注">
                            <el-input
                                type="textarea"
                                v-model="form.cfgRemark"
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
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            dialogVisible: false,
            form: {
                cfgDefault: '',
                cfgItem: '',
                cfgItemName: '',
                cfgOption: '',
                cfgRemark: '',
                cfgType: '',
                cfgValues: '',
            },
            rules: {
                cfgItem: [
                    {
                        required: true,
                        message: "请输入配置项",
                        trigger: "blur"
                    }
                ],
                cfgType: [
                    {
                        required: true,
                        message: "请输入配置类型",
                        trigger: "blur"
                    }
                ],
                cfgItemName: [
                    {
                        required: true,
                        message: "请输入配置项名",
                        trigger: "blur"
                    }
                ],
                cfgValues: [
                    {
                        required: true,
                        message: "请输入配置值",
                        trigger: "blur"
                    }
                ]
            },
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
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$systemApi.systemConfiguration.cfgCreate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false
                                this.$$message({
                                    message: res.message,
                                    type: 'success'
                                })
                                this.$parent.$refs.page.getList(1);
                                this.$refs.form.resetFields();
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
