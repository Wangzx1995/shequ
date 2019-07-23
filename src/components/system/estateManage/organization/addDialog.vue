<template>
    <div>
        <el-dialog
            title="新增组织架构"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
        >
            <el-form
                :model="addForm"
                :rules="rules"
                ref="addForm"
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
                            <el-input v-model="addForm.deptCode"></el-input>
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
                            <el-input v-model="addForm.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门简称"
                            prop="deptIntro"
                        >
                            <el-input v-model="addForm.deptIntro"></el-input>
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
                            <el-select
                                clearable
                                v-model="addForm.parentId"
                                placeholder="请选择上级部门"
                            >
                                <el-option
                                    label="物业部门"
                                    value="01"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="部门全称"
                            prop="deptName"
                        >
                            <el-input v-model="addForm.deptName"></el-input>
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
                            <el-input v-model="addForm.sort"></el-input>
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
            addForm: {
                deptCode: "",
                deptIntro: "",
                deptName: "",
                parentId: null,
                sort: null,
                tel: ""
            },
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
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$systemApi.estateManage
                        .deptCreate(this.addForm)
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
    }
};
</script>

<style>
</style>
