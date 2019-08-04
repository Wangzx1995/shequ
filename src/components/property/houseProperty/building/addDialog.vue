<template>
    <div>
        <el-dialog
            title="新增楼栋"
            :visible.sync="dialogVisible"
            width="800px"
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
                    <el-col :span="11">
                        <el-form-item
                            label="楼栋编号"
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
                            label="有无电梯"
                            prop="elevator"
                        >
                            <el-select
                                clearable
                                v-model="form.elevator"
                                placeholder="请选择有无电梯"
                            >
                                <el-option
                                    label="有"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="无"
                                    value="2"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="楼栋名称"
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
                            label="建筑年代"
                            prop="buildingAge"
                        >
                            <el-input v-model="form.buildingAge"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="所属片区"
                            prop="areaId"
                        >
                            <el-select
                                clearable
                                v-model="form.areaId"
                                placeholder="请选择所属片区"
                            >
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.value"
                                    :label="item.areaName"
                                    :value="item.areaId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col
                        :span="11"
                        :offset="1"
                    >
                        <el-form-item
                            label="产权性质"
                            prop="nature"
                        >
                            <el-select
                                clearable
                                v-model="form.nature"
                                placeholder="请选择产权性质"
                            >
                                <el-option
                                    v-for="item in natureList"
                                    :key="item.value"
                                    :label="item.dicName"
                                    :value="item.dicCode"
                                ></el-option>
                            </el-select>
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
export default {
    props: {
        areaList: Array,
    },
    data() {
        return {
            dialogVisible: false,
            form: {
                areaId: null,
                buildingAge: null,
                code: '',
                elevator: null,
                name: '',
                nature: ''
            },
            natureList: [],
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入楼栋编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入楼栋名称",
                        trigger: "blur"
                    }
                ]
            },
        };
    },
    methods: {
        //打开dialog
        showDialog(list) {
            this.natureList = list
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
                    this.$propertyApi.houseProperty.building.add(this.form)
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
