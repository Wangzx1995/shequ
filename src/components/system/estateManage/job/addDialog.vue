<template>
    <div>
        <el-dialog
            title="新增职务"
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
                            label="职务编码"
                            prop="dutyCode"
                        >
                            <el-input v-model.number="form.dutyCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="职务名称"
                            prop="dutyName"
                        >
                            <el-input v-model="form.dutyName"></el-input>
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
                dutyCode: '',
                dutyName: '',
                sort: ''
            },
            rules: {
                dutyCode: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入职务编码"
                    },
                ],
                dutyName: [
                    {
                        required: true,
                        message: "请输入职务名称",
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
                    this.$systemApi.estateManage.dutyCreate(this.form)
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
