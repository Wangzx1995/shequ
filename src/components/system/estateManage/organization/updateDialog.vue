<template>
    <div>
        <el-dialog
            title="编辑组织架构"
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
                            label="部门编码"
                            prop="deptCode"
                        >
                            <el-input v-model="form.deptCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="联系方式"
                            prop="tel"
                        >
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门简称"
                            prop="deptIntro"
                        >
                            <el-input v-model="form.deptIntro"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="上级部门"
                            prop="parentId"
                        >
                            <Dictionary
                                :typeCode="3001"
                                v-model="form.parentId"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门全称"
                            prop="deptName"
                        >
                            <el-input v-model="form.deptName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
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
import Dictionary from '@/components/common/select/Dictionary'
export default {
    props: {
        updateForm: Object
    },
    data() {
        return {
            dialogVisible: false,
            form: {},
            rules: {
                deptCode: [
                    {
                        required: true,
                        message: "请输入部门编码",
                        trigger: "blur"
                    }
                ],
                deptIntro: [
                    {
                        required: true,
                        message: "请输入部门简称",
                        trigger: "blur"
                    }
                ],
                deptName: [
                    {
                        required: true,
                        message: "请输入部门全称",
                        trigger: "blur"
                    }
                ]
            }
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
        //修改
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$systemApi.estateManage
                        .deptUpdate(this.form)
                        .then(res => {
                            if (res.code == 1000) {
                                this.dialogVisible = false;
                                this.$$message({
                                    message: res.message,
                                    type: "success"
                                });
                                this.$parent.$refs.page.getList(1);
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
        Dictionary,
    }
};
</script>

<style>
</style>
