<template>
    <div>
        <el-dialog
            title="编辑单元"
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
                            label="单元编号"
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
                            label="所属片区"
                            prop="areaId"
                        >
                            <el-select
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
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="单元名称"
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
                            label="所属楼栋"
                            prop="buildingId"
                        >
                            <el-select
                                v-model="form.buildingId"
                                placeholder="请选择楼栋"
                            >
                                <el-option
                                    v-for="item in buildingList"
                                    :key="item.value"
                                    :label="item.buildingName"
                                    :value="item.buildingId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item
                            label="所属楼层"
                            prop="floorNumber"
                        >
                            <el-input v-model="form.floorNumber"></el-input>
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
                <el-button @click="closeDialog">取 消</el-button>
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
            form: {},
            rules: {
                code: [
                    {
                        required: true,
                        message: "请输入单元编号",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入单元名称",
                        trigger: "blur"
                    }
                ],
                buildingId: [
                    {
                        required: true,
                        message: "请选择楼栋",
                        trigger: "change"
                    }
                ],
                floorNumber: [
                    {
                        required: true,
                        message: "请输入所属楼层",
                        trigger: "blur"
                    }
                ]
            },
            buildingList: [],
            btn: 0
        };
    },

    watch: {
        dialogVisible() {
            if (this.dialogVisible == false) {
            }
        },
        'form.areaId'() {
            this.btn += 1
            if (this.btn > 1) {
                this.form.buildingId = ''
                if (this.form.areaId == '') {
                    this.getBuildingList(0)
                } else {
                    this.getBuildingList(this.form.areaId)
                }
            }
        },
    },
    methods: {
        //打开dialog
        showDialog(row) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.form = row;
                if (this.form.areaId == undefined) {
                    this.getBuildingList(0)
                } else {
                    this.getBuildingList(this.form.areaId)
                }
                this.btn = 0
            })
        },
        //关闭dialog
        closeDialog() {
            this.$refs.form.resetFields();
            this.dialogVisible = false;
            this.$parent.$refs.page.getList(this.$parent.$refs.page.pageIndex);
        },
        //获取楼栋
        getBuildingList(areaId) {
            this.$propertyApi.personManagement.household.cascade({
                areaId: areaId,
            }).then((res) => {
                if (res.code == 1000) {
                    this.buildingList = res.data
                }
            })
        },
        //修改操作
        update() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$propertyApi.houseProperty.unit.update(this.form)
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
