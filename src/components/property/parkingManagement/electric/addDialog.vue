<template>
    <div>
        <el-dialog
            title="新增电动车"
            :visible.sync="dialogVisible"
            width="800px"
            :modal-append-to-body='false'
            center
            @close="closeDialog()"
        >
            <div class="dialogBody">
                <div>
                    <el-form
                        :model="form"
                        :rules="rules"
                        ref="form"
                        label-width="110px"
                        class="demo-ruleForm dialog-form"
                        label-position="left"
                    >
                        <div>
                            <el-divider content-position="left">电动车信息</el-divider>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="车牌号"
                                        prop="plateNumbers"
                                    >
                                        <el-input v-model="form.plateNumbers"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="车架号"
                                        prop="vin"
                                    >
                                        <el-input v-model="form.vin"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item
                                        label="车辆照片"
                                        prop="accessoryCar"
                                    >
                                        <imgUpload
                                            :imgSetting="{
                                                limit: 1,
                                                isShow: true
                                            }"
                                            :getImgUrl="getImgUrl1"
                                            ref="imgUpload1"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col
                                    :span="11"
                                    :offset="1"
                                >
                                    <el-form-item
                                        label="设备识别号"
                                        prop="pfid"
                                    >
                                        <el-input v-model="form.pfid"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider content-position="left">关联房屋</el-divider>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="车主姓名"
                                    prop="userName"
                                >
                                    <el-input v-model="form.userName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="11"
                                :offset="1"
                            >
                                <el-form-item
                                    label="所属单元"
                                    prop="elementId"
                                >
                                    <elementId
                                        :buildingId="form.buildingId"
                                        v-model="form.elementId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="所属片区"
                                    prop="areaId"
                                >
                                    <areaId v-model="form.areaId" />
                                </el-form-item>
                            </el-col>
                            <el-col
                                :span="11"
                                :offset="1"
                            >
                                <el-form-item
                                    label="所属房屋"
                                    prop="roomId"
                                >
                                    <roomId
                                        :elementId="form.elementId"
                                        v-model="form.roomId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11">
                                <el-form-item
                                    label="所属楼栋"
                                    prop="buildingId"
                                >
                                    <buildingId
                                        :areaId="form.areaId"
                                        v-model="form.buildingId"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div>

                </div>
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
import areaId from "@/components/property/selectForm/areaId";
import buildingId from "@/components/property/selectForm/buildingId";
import elementId from "@/components/property/selectForm/elementId";
import roomId from "@/components/property/selectForm/roomId";
export default {
    data() {
        const _this = this
        return {
            dialogVisible: false,
            form: {
                accessoryCar: null,
                areaId: null,
                buildingId: null,
                createtime: null,
                elementId: null,
                pfid: null,
                plateNumbers: null,
                roomId: null,
                userName: null,
                vin: null
            },
            rules: {
                plateNumbers: [
                    {
                        required: true,
                        message: "请输入车牌号",
                        trigger: "blur"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: "请输入驾驶人",
                        trigger: "blur"
                    }
                ],
                buildingId: [
                    {
                        required: true,
                        message: "请选择所属楼栋",
                        trigger: "change"
                    }
                ],
                elementId: [
                    {
                        required: true,
                        message: "请选择所属单元",
                        trigger: "change"
                    }
                ],
                roomId: [
                    {
                        required: true,
                        message: "请选择所属房屋",
                        trigger: "change"
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
            console.log(this.form)
            this.$refs.form.validate(valid => {
                if (valid) {
                    let addForm = {
                        ...this.form,
                        accessoryCar: this.form.accessoryCar.join(','),
                    }
                    this.$propertyApi.parkingManagement.electric
                        .add(addForm)
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
        },
        //获取图片
        getImgUrl1(data) {
            this.form.accessoryCar = data.split(',');
        },
    },
    components: {
        imgUpload,
        Dictionary,
        areaId,
        buildingId,
        elementId,
        roomId
    }
};
</script>

<style>
</style>
